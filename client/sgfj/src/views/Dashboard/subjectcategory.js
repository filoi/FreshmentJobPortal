import React ,{Component} from 'react';

class SubjectCategoryItems extends Component{

    render(){
        const {subcategory} = this.props;
        console.log(subcategory)
        return(
            <tr>
                <td>{subcategory.name}</td>
                <td>{subcategory.description}</td>
                <td>{subcategory.status}</td>
            </tr>
        )
    }
}

export default SubjectCategoryItems;