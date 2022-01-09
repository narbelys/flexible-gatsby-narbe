import React from 'react'

import DefaultLayout from '../components/layout'
import SEO from '../components/seo'

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props

    return (
      <DefaultLayout>
        <SEO title="Donar" />
        <div className="content-box clearfix">
          <script src="https://donorbox.org/widget.js" paypalExpress="false"></script><iframe src="https://donorbox.org/embed/escritora-narbelys?default_interval=o&hide_donation_meter=true" name="donorbox" allowpaymentrequest="allowpaymentrequest" seamless="seamless" frameborder="0" scrolling="no" height="900px" width="100%" ></iframe>
        </div>
      </DefaultLayout>
    )
  }
}

export default NotFoundPage
