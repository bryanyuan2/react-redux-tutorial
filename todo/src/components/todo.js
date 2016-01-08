import React from 'react'
import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import store from '../stores/store'
import actions from '../actions/actions'

export default class Todo extends React.Component{

  componentDidMount() {
    actions.getAll();
  }

  add(){
    var item =this.refs.item.value;
    this.refs.item.value='';
    actions.add(item);

  }

  remove(i){
    actions.remove(i);
  }

  render() {
    let items;
    if(this.state.list){
      items=this.state.list.map( (item,i)=> {
              return <li key={i}>
                {item.name}
                <button onClick={this.remove.bind(this,i)}>remove</button>
              </li>
            })
    }
    return (
        <div>
          <input type="text" ref="item"/>
          <button onClick={this.add.bind(this)}>add</button>
          <ul>
            {items}
          </ul>
        </div>
    )
  }
}

// ES6 mixin写法
ReactMixin.onClass(Todo, Reflux.connect(store));
