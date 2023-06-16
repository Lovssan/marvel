import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";

function Page404() {
    return (
        <HelmetProvider>
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"/>
                <title>Page not found</title>
            </Helmet>
            <ErrorMessage />
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}> 
            Page doesn't exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold',
            'fontSize': '24px', 'textDecoration': 'underline', 'color': '#9F0013'}} to={'/'}> Back to main page</Link>
        </div>
        </HelmetProvider>
    );
}

export default Page404;