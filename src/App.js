import React from 'react'
import './App.scss'
import tableView from './components/tableView'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [],
      filterTableData: [],
      isLoading: true,
      vendorList: [],
      selectedVal: 'All Supliers'
    }
  }
  getData = () => {
    return new Promise (resolve => {
      fetch ('https://chefhero.free.beeceptor.com/')
      .then(response => response.json())
      .then(data => {
        this.setState({tableData: data.data, filterTableData: data.data, isLoading: false})
        resolve(data.data)        
      })
    })
  }
  componentDidMount () {
    this.getData().then((response) => {
      let vendorList = [...new Set(response.map(item => item.vendorName))]
      vendorList.unshift(this.state.selectedVal)
      this.setState({vendorList})
    })
  }
  change = (event) => {
    let {filterTableData} = this.state
    if (event.target.value === 'All Supliers') {
      this.setState({tableData:filterTableData})
    } else {
      this.setState({selectedVal: event.target.value})
      let data = filterTableData.filter(item => item.vendorName === event.target.value)
      this.setState({tableData:data})
    }
  }
  reset = (event) => {
    this.setState({selectedVal: 'All Supliers'}, () => {
      this.getData()
    })
  }
  render () {
    let {tableData, isLoading, vendorList, selectedVal} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img alt='logo' src="http://order.chefhero.com/static/chefhero/images/chefhero_logo_white.png"></img>
        </header>
        <section className="bg-section">
          {
            !isLoading 
            ?
            <div className='inline'>
              <div className="selectdiv ">
                <label>
                    <select onChange={this.change} value={selectedVal}>
                      {
                        vendorList.map((item, id) => <option value={item} key={id}>{item}</option>)
                      }                
                    </select>
                </label>
              </div>
              <button onClick={this.reset} className="btn">Reset Filter</button>
            </div> 
            : 
            null
          }          
        </section>
        {!isLoading ? tableView({data: tableData}) : null}
      </div>
    )
  }
}

export default App
