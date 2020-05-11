import React from "react"

export default class Stripeitems extends React.Component {
  componentDidMount() {
    this.stripe = window.Stripe("pk_test_bkZAbK99pEhk3G8SZ3dLcT9f00EQp7B4qe")
  }

  handleSubmit = e => {
    e.preventDefault()
    this.stripe
      .redirectToCheckout({
        items: [{ sku: "sku_HE1snJB0ojpePX", quantity: 1 }],
        successUrl: "http://localhost:8000/success",
        cancelUrl: "http://localhost:8000/canceled",
      })
      .then(result => {
        if (result.error) {
          console.error(result.error)
        }
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button>Purchase This</button>
      </form>
    )
  }
}
