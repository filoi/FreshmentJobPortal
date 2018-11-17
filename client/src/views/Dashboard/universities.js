import React ,{Component} from 'react';

class UniversitiesItem extends Component{

    render(){
        const {university} = this.props;
        console.log(university)
        return(
            <tr>
                <td>{university.name}</td>
                <td>{university.email}</td>
                <td>{university.mobileno}</td>
                <td>{university.affiliated}</td>
                <td>{university.description}</td>
            </tr>
        )


    }
}

export default UniversitiesItem;