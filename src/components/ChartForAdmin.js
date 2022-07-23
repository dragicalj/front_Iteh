import { useState } from 'react';
import React from 'react';
import {Bar} from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

function ChartForAdmin({data}) {

    // let groups = JSON.parse(localStorage.getItem("groups"))
    let groupNames = [""];
    // groups.forEach(g => {
    //     groupNames.push(g.name);
    // });

    let userCount = [];
    // groups.forEach(g => {
    //     userCount.push(g.users.length);
    // });

    const state = {
        labels: data.groupNamesForChart,
        datasets: [
          {
            label: 'User per group',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: data.userInGroup
          }
        ]
      }

    return (
        
      <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    )

}

export default ChartForAdmin