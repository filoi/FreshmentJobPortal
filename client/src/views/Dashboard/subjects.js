import React ,{Component} from 'react';

class SubjectItems extends Component{

    render(){
        const {subject} = this.props;
        console.log(subject)
        return(
            <tr>
                <td>{subject.name}</td>
                <td>{subject.code}</td>
                <td>{subject.status}</td>
            </tr>
        )
    }
}

export default SubjectItems;