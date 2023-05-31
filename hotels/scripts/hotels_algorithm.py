# individuos [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1]
# para cada uno representa una selección de hotel para un lugar determinado, en este caso una zona como cartagena
# cada individuo es una selección de todos los hoteles disponibles de una zona
# el individuo es una lista de 0 y 1, donde 1 representa que el hotel fue seleccionado y 0 que no
# el tamaño de la lista es igual al número de hoteles disponibles
# en la zona y la posición en el individuo es equivalente a la posición del hotel en la lista de hoteles de la zona
# de esto se genera una población inicial de invidivuos aleatorios considerando el número de hoteles que se pidieron
# es decir, si se pidieron 3 hoteles solo pueden haber 3 unos en el individuo
# la función de fitness es la suma de los scores de los hoteles seleccionados y minimiza las distancias entre los hoteles seleccionados
# la función fitness también considera los requerimientos de accesibilidad de los hoteles seleccionados
# y el costo de los hoteles seleccionados
# dando como resultado maximizar los scores,minimizar las distancias, minimizar el costo y maximizar los requerimientos de accesibilidad

import random
import numpy as np
from deap import base, creator, tools, algorithms
import math
import copy

random.seed(42)

def create_individual(hotels_number, required_hotels):
    individual = [0] * hotels_number
    for i in range(required_hotels):
        index = random.randint(0, hotels_number - 1)
        while individual[index] == 1:
            index = random.randint(0, hotels_number - 1)
        individual[index] = 1
    return individual


def objective_func(individual, required_hotels, hotels):
    count = 0
    distance_aux = []
    score = 0
    distance = 0
    cost = 0
    for i, hotel in enumerate(individual):
        if count == required_hotels:
            break
        if hotel == 1:
            aux = hotels[i]["geolocation"].split(",")
            distance_aux.append({float(aux[0]), float(aux[1])})
            count += 1
            cost += float(hotels[i]["price"])
            score += (
                float(hotels[i]["global_score"].replace(",", "."))
                * int(hotels[i]["hotel_stars"])
            )
    distance = distance_between_points(distance_aux)
    return score, cost, distance   

def cxTwoPointWithConstraint(ind1, ind2, required_hotels, toolbox):
    child1, child2 = tools.cxTwoPoint(ind1, ind2)
    for i, child in enumerate([child1, child2]):
        if sum(child) != required_hotels:
            child = toolbox.individual()
        if i == 0:
            child1 = child
        else:
            child2 = child
    return child1, child2


def mutFlipBitWithConstraint(individual, indpb, required_hotels, toolbox):
    for i in range(len(individual)):
        if random.random() < indpb:
            individual[i] = type(individual[i])(not individual[i])
    if sum(individual) != required_hotels:
        individual = toolbox.individual()
    return (individual,)


def filterHotels(hotels, user_preferences):
    for hotel in hotels:
        score_reduction = 0.0
        if not hotel["sustainable_trip"] and user_preferences["sustainable_trip"] == True:
            score_reduction += 1.5
        if not hotel["accept_pay_cards"] and user_preferences["accept_pay_cards"] == True:
            score_reduction += 1.5
        if not hotel["accept_cash"] and user_preferences["accept_cash"] == True:
            score_reduction += 1.5
        if not hotel["security_cameras"] and user_preferences["security_cameras"] == True:
            score_reduction += 1.5
        if not hotel["includes_breakfast"] and user_preferences["includes_breakfast"] == True:
            score_reduction += 1.5
        if not hotel["english"] and user_preferences["english"] == True:
            score_reduction += 1.5
        hotel["global_score"] = str(float(hotel["global_score"].replace(",", ".")) - score_reduction)
    return hotels


def distance_between_points(points):
    points = [[math.radians(lat), math.radians(lon)] for lat, lon in points]
    distances = []
    for i in range(len(points)):
        for j in range(i + 1, len(points)):
            lat1, lon1 = points[i]
            lat2, lon2 = points[j]
            dlat = lat2 - lat1
            dlon = lon2 - lon1
            a = (
                math.sin(dlat / 2) ** 2
                + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
            )
            c = 2 * math.asin(math.sqrt(a))
            r = 6371
            distance = c * r
            distances.append(distance)
    return sum(distances)


def generateRecommendation(hotels, required_hotels, user_preferences):
    hotels_number = len(hotels)
    aux_hotels = copy.deepcopy(hotels)
    if user_preferences:
        hotels = filterHotels(hotels, user_preferences)
    creator.create("FitnessMulti", base.Fitness, weights=(1.0, -1.0, -1.0))
    creator.create("Individual", list, fitness=creator.FitnessMulti)

    toolbox = base.Toolbox()
    
    toolbox.register("attr", create_individual, hotels_number, required_hotels)
    toolbox.register("individual", tools.initIterate, creator.Individual, toolbox.attr)
    toolbox.register("population", tools.initRepeat, list, toolbox.individual)

    toolbox.register(
        "mate",
        cxTwoPointWithConstraint,
        required_hotels=required_hotels,
        toolbox=toolbox,
    )
    toolbox.register(
        "mutate",
        mutFlipBitWithConstraint,
        indpb=0.05,
        required_hotels=required_hotels,
        toolbox=toolbox,
    )
    toolbox.register("select", tools.selNSGA2)
    toolbox.register(
        "evaluate",
        objective_func,
        required_hotels=required_hotels,
        hotels=hotels,
    )

    pop_size = 200
    CXPB, MUTPB, NGEN = 0.7, 0.3, 50
    pop = toolbox.population(n=pop_size)
    stats = tools.Statistics(lambda ind: ind.fitness.values)
    stats.register("avg", np.mean)
    stats.register("std", np.std)
    stats.register("min", np.min)
    stats.register("max", np.max)
    logbook = tools.Logbook()
    pareto = tools.ParetoFront()
    pop, logbook = algorithms.eaSimple(
        pop,
        toolbox,
        cxpb=CXPB,
        mutpb=MUTPB,
        ngen=NGEN,
        stats=stats,
        halloffame=pareto,
        verbose=True,
    )
    hotels_selection = []
    ind = pareto[0]
    for i, selection in enumerate(ind):
        if selection == 1:
            hotels_selection.append(aux_hotels[i])

    return pop, logbook, pareto, hotels_selection
