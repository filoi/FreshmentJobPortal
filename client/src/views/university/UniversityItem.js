import React ,{Component} from 'react';
import { AppAsideToggler } from '@coreui/react';

class UniversitiesItem extends Component{
    showProfile(){
        AppAsideToggler.asideToggle();
    };

    render(){
        const {university} = this.props;
        console.log(university)
        return(
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 data-block">
                <div className="card">
                <div className="card-block p-1 clearfix">
                    <i className="fa fas fa-graduation-cap bg-info p-2 font-2xl mr-1 float-left"></i>
                    <div className="h5 text-info mb-0 mt-h font-weight-bold">{university.name}</div>
                    <div className="text-muted font-xs">{university.email} | {university.mobileno}</div>
                </div>
                </div>
            </div>
        )


    }
}

export default UniversitiesItem;