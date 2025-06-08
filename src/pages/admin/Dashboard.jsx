import React from 'react';
import Card from '../../components/dashboards/Card';
import Overview from '../../components/dashboards/Overview';
import TopCommand from '../../components/dashboards/TopCommand';
import Recent from '../../components/dashboards/Recent';
import TopCategories from '../../components/dashboards/TopCategories';

function Dashboard() {
    return (
        <>
            <div className="ml-60">
                <Card />
                <div className="flex p-2 py-5 justify-between space-x-4" style={{ width: "100%", height: "400px" }} >
                    <Overview />
                    <Recent />
                </div>
                <div className="flex p-2 py-5 justify-between space-x-4" style={{ width: "100%", height: "400px" }}>
                    <TopCommand />
                    <TopCategories />
                </div>
            </div >
        </>
    );
}

export default Dashboard;