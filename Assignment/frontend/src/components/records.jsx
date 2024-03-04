import React from 'react';
import './records.css';

const Records = ({customers}) => {
    
  return (  
    <div className='tabledata'>
                <table>
                    <thead>
                      <tr>
                        <th>Sno</th>
                        <th>Customer Name</th>
                        <th>Age</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer)=> (
                        <tr key={customer.sno}>
                          <td>{customer.sno}</td>
                          <td>{customer.customer_name}</td>
                          <td>{customer.age}</td>
                          <td>{customer.location}</td>
                          <td>{customer.created_at.split(' ')[0]}</td>
                          <td>{customer.created_at.split(' ')[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
  ) 
}

export default Records ;