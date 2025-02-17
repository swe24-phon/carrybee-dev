import React from 'react';
import { LocationIcon } from './DashboardIcons';
import '../css/Invoice.css';

interface InvoiceCardProps {
  invoiceNo: string;
  status: string;
  date: string;
  item: string;
  pickupAddress: string;
  dropoffAddress: string;
}

const InvoiceCard = ({
  invoiceNo,
  status,
  date,
  item,
  pickupAddress,
  dropoffAddress
}: InvoiceCardProps) => {
  return (
    <div className="card-container">
      <div className="card-content">
        <div className="card-text">invoice no. {invoiceNo}</div>
        
        <div className="invoice-header">
          <div className="card-text">status: {status}</div>
          <div className="card-text">{date}</div>
        </div>
        
        <div className="card-text invoice-item">item: {item}</div>
        
        <div className="address-container">
          <div className="address-line">
            <LocationIcon />
            <div className="card-text">{pickupAddress}</div>
          </div>
          
          <div className="address-line">
            <LocationIcon />
            <div className="card-text">{dropoffAddress}</div>
          </div>
        </div>
        
        <div className="more-details">
          more details
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;
