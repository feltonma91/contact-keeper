import React, { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";

const Alerts = () => {
    // Set up Contact context
    const alertContext = useContext(AlertContext);

    // Deconstruct methods from context
    const { alerts } = alertContext;

    return (
        alerts.length > 0 &&
        alerts.map((alert) => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle" /> {alert.msg}
            </div>
        ))
    );
};

export default Alerts;
