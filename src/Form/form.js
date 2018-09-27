import React from "react";
import CancelIcon from "../Form/cancel.svg"
import EditIcon from "../Form/edit.svg";

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          value: '',
          arr: [],
          act: 0,
          index: 0
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.refs.name.focus();
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        event.preventDefault();
        let count=0;
        this.state.arr.map((elems) => {
            if (elems == this.state.value) {
                count += 1
            }
        })
        if (count === 0 & this.state.act ===0) {
            let temparr = this.state.arr;
            temparr.push(this.state.value)
            this.setState({arr: temparr});
        } else if (this.state.act !== 0) {
            let ind = this.state.index;
            this.state.arr[ind] = this.state.value;
            this.setState({act: 0});
        }
        else {
            alert("already exists");
        }
    }

    clickCancel = (elements) => {
        let array = this.state.arr;
        let index = array.indexOf(elements);
        delete array[index]
        this.setState({arr:array});
    }

    clickEdit = (index) => {
        let editArray = this.state.arr[index];
        this.refs.name.value = editArray;

        this.refs.name.focus();

        this.setState({
            act: 1,
            index: index
        })
    }

  
    render() {
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" ref="name" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>
            <ul>
                {this.state.arr.map((elements, index) =>
                    <li> {elements}  <img src = {CancelIcon} onClick={() => this.clickCancel(elements)} /> <img src = {EditIcon} onClick={() => this.clickEdit(index)} /></li>
                )}
            </ul>
        </div>
        </div>
      );
    }
  }

export default Form;