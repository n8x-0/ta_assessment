const

const CurrencyConvertor = () => {
  return (
    <div className="container py-5 d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column gap-3">

        <div className="input-group">
          <input type="text" aria-label="First name" className="form-control" />
          <select className="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

        <div className="input-group">
          <input type="text" aria-label="First name" className="form-control" />
          <select className="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

      </div>
    </div>
  )
}

export default CurrencyConvertor