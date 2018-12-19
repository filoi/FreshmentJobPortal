import React ,{Component} from 'react';

class CoursesItem extends Component{

    render(){
        const {course} = this.props;
        console.log(course)
        return(
            <tr>
                <td>{course.name}</td>
                <td>{course.coursecode}</td>
            </tr>
        )


    }
}

export default CoursesItem;