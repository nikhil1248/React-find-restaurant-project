import './tableView.scss';

function getDateFormat (dt) {
  var result = new Date(dt).toDateString().substr(4).split(' ')
  result[0] = result[0]+'.'
  result[1] = result[1]+','
  return result.join(' ')
}

const tableView = props => {
  return (
    <div className="table-view">
      <table>
          <thead className="heading">
            <tr>
              <th>STATUS</th>
              <th>DELIVERY DAY</th>
              <th>SUPPLIER</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {
              props.data.map((item, id) => {
                let {orderBuyerStatus, deliveryDay, vendorName, isPendingVendorOnboarding, isBYOS, total} = item
                return (
                  <tr key={id} className="heading">
                    <td><span className={orderBuyerStatus === 'Paid' ? 'status-paid' : 'status-deliver'}>{orderBuyerStatus}</span></td>
                    <td>{getDateFormat(deliveryDay)}</td>
                    <td>{vendorName}
                      <span className={!isBYOS ? 'ml-15 byos' : ''}>{!isBYOS ? 'MARKET' : ''}</span>
                      <span className={isPendingVendorOnboarding ? 'ml-15 ispendingvendoronboarding' : '' }>{isPendingVendorOnboarding ? '1st' : ''}</span>
                    </td>
                    <td>{total ? total : ''}</td>
                  </tr>
                )
              })
            }
          </tbody>
      </table>
    </div>
  )
}

export default tableView;
