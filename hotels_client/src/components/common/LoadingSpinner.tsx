import "../../assets/styles/spinner.css"

type Props = {
    show: boolean
}

const LoadingSpinner = (props: Props) => {
  return (
    props.show ?
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div>:<></>
  )
}

export default LoadingSpinner