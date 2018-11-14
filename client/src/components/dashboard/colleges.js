import React ,{Component} from 'react';

class CollegesItem extends Component{

    render(){
        const {college} = this.props;
        console.log(college)
        return(
            <tr>
                <td>{college.name}</td>
                <td>{college.email}</td>
                <td>{college.mobileno}</td>
            </tr>
        )


    }
}

export default CollegesItem;