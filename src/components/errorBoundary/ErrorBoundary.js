import { Component } from "react/cjs/react.production.min";
import ErrorMessageMarvel from '../errorMessageMarvel/ErrorMessageMarvel';

class ErrorBoundary extends Component {
    state= {
        error:false
    }
    componentDidCatch(error,errorInfo) {
        console.log(error,errorInfo);
        this.setState({
            error:true
        })
    }

    render(){
        if (this.state.error){
            return <ErrorMessageMarvel/>;
        }
return this.props.children;
    }
}

export default ErrorBoundary;