export const invalidNumber = (string: string) => {
    const regex = new RegExp(/^(10|[1-9])$/gm)
    return !regex.test(string)
}