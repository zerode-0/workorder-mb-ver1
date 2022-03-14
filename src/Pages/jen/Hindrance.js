
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { triggerBase64Download } from 'react-base64-downloader';

export default function Hindrance() {
    const [hindrance,setHindrance]=useState([]);
    const[hindHIstory,setHindHistory]=useState([]);
    useEffect(async()=>{
        setHindrance(await hindranceList());
    },[]);
    const onHistory =async(event,id)=>{
        
        event.preventDefault();
        setHindHistory([]);
        setHindHistory(await hindranceHistory(id));
        //setHistoryId(id);
    };

  return (
    <div>
      <div class="tab-content">
        <div className="card" id="multi-item-preview">
          <div className='card-body'>

            <h4 class="header-title mb-3">Record List</h4>
            <div class="table-responsive">
              <table class="table mb-0">

                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Work</th>
                        <th>MB Book</th>
                        <th>Hindrance Type</th>
                        <th>Description</th>
                        <th>Occured On</th>
                        <th>Reported On</th>
                        <th>Resolved On</th>
                        <th>Days Since Reported</th>
                        <th>Days Since Last Action</th>
                        <th>Days Attributable to Vendor</th>
                        <th>Days Not Attributable to Vendor</th>
                        <th>Remarks</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                {
                    hindrance.map((data,index)=>{
                    return(<tr className='producst-datatable_wrapper' key={index} >
                     <td>{index+1}</td>
                     <td>{data.WorkName}</td>
                     <td>{data.MBBookName}</td>
                     <td>{data.HindranceType}</td>
                     <td>{data.HndrDescription}</td>
                     <td>{data.OccurrenceDt}</td>
                     <td>{data.ReportingDt}</td>
                     <td>{data.CompletionDt}</td>
                     <td>{data.DaysSinceReported}</td>
                     <td>{data.DaysSinceLastAction}</td>
                     <td>{data.DaysAttributableToVendor}</td>
                     <td>{data.DaysNotAttributableToVendor}</td>
                     <td><button class="btn btn-link text-danger m2" data-bs-toggle="modal" data-bs-target="#history" style={{padding:0}} onClick={(e)=>onHistory(e,data.HId)}>View</button></td>
                     <td>{data.CompletionDt!==null?<div>Resolved<button className='btn btn-link' style={{padding:0}} onClick={(e) => savePDF(data.HId,data.DeptId)}>Report</button></div>:'Pending'}</td>
                    </tr>)
                })}
                </tbody>
                </table>
                </div>
                </div>
                </div>
                </div>
                
                <HistoryReport item={hindHIstory}/>
                </div>
  )
}
export const hindranceList= async function () {
return await fetch("/api/HindranceWorkWise", {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('Token')
    }
  }).then((result) => {
    if (result.ok === true) {
         console.log('list: ', result);
         return result.json();
      }
  }).then((data)=>{
    console.log('list: ', data);
      return data.data;
  }).catch((error)=>{
      throw error
  });
}
export const hindranceHistory= async function (id) {
    return await fetch("/api/HindranceHistory/"+id, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('Token')
        }
      }).then((result) => {
        if (result.ok === true) {
             console.log('list: ', result);
             return result.json();
          }
      }).then((data)=>{
        console.log('list: ', data);
          return data.data;
      }).catch((error)=>{
          throw error
      });
    }
    export const savePDF= async function (HId,DeptId) {
        
        let data= await fetch("/api/HindranceReport", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem('Token')
            },
            body:JSON.stringify({'DeptId':DeptId,'HId':HId})
          }).then((result) => {
            if (result.ok === true) {
                 console.log('list: ', result);
                 return result.json();
              }
          }).then((data)=>{
            console.log('pdf: ', data);
            const doc = new jsPDF();
            for(let i=0;i<data.data.hindranceReportMaster.length;i++){
              doc.setFont('Arial','bold');
            doc.setFontSize(18);
            doc.text('Government of Rajasthan',(doc.internal.pageSize.width / 3),10);
            doc.setFont('Arial','normal');
            doc.setFontSize(12);
            doc.text(data.data.hindranceReportMaster[i].DeptName,(doc.internal.pageSize.width / 2.6),17);
            doc.setFont('Arial','bold');
            doc.setFontSize(14);
            doc.text('HINDRANCE REGISTER',(doc.internal.pageSize.width / 2.7),24);
            doc.setFontSize(10);
            doc.text("Work Name",8,40);
            doc.setFont('Arial','normal');

            doc.text(data.data.hindranceReportMaster[i].WorkName,28,40);
            doc.setFont('Arial','bold');
            doc.text("Agreement No ",48, 40);
            doc.setFont('Arial','normal');
            doc.text(data.data.hindranceReportMaster[i].AgreementNo,73, 40);
            doc.setFont('Arial','bold');
            doc.text("Agreement Date",90,40);
            doc.setFont('Arial','normal');
            doc.text(data.data.hindranceReportMaster[i].AgreementDate,115, 40);
            doc.setFont('Arial','bold');
            doc.text(
                "Contractor/Firm ", 8, 50);
            doc.setFont('Arial','normal');
            doc.text(data.data.hindranceReportMaster[i].VendorName,35,50);
            doc.setFont('Arial','bold');
                doc.text("EstimatedCommencementDate",48,50);
                doc.setFont('Arial','normal');

            doc.text(data.data.hindranceReportMaster[i].EstimatedCommencementDate,96,50);
            doc.setFont('Arial','bold');
            doc.text("EstimatedCompletionDate",120,50);
            doc.setFont('Arial','normal');
            doc.text(data.data.hindranceReportMaster[i].EstimatedCompletionDate,161,50);
            doc.setFont('Arial','bold');
            doc.text("OccurrenceDt",8,110);
            doc.setFont('Arial','normal');
            doc.text(data.data.hindranceReportMaster[i].OccurrenceDt,30,110);
            doc.setFont('Arial','bold');
            doc.text("DaysAttributableToVendor",60,110);
            doc.setFont('Arial','normal');
            doc.text(data.data.hindranceReportMaster[i].DaysAttributableToVendor,103, 110);
            doc.setFont('Arial','bold');
            doc.text("DaysNotAttributableToVendor",120,110);
            doc.setFont('Arial','normal');
            doc.text(data.data.hindranceReportMaster[i].DaysNotAttributableToVendor,168,110);
            doc.setFont('Arial','bold');
            doc.text("TotalDaysOfHndr",8,125);
            doc.setFont('Arial','normal');
            doc.text(data.data.hindranceReportMaster[i].TotalDaysOfHndr
            ,37,125);

            let col=['Description','Completion At','Work Order Amount'];
            let element=data.data;
            var generateData = function() {
              var result = [];
              var data = {
                Description: element.hindranceReportMaster[i].HndrDescription,
                CompletionAt: element.hindranceReportMaster[i].CompletionDt,
                ReportedAt:element.hindranceReportMaster[i].ReportingDt,
                WorkOrderAmount: element.hindranceReportMaster[i].WOAmount?element.hindranceReportMaster[i].WOAmount:'-',
              };
                data.id = (i + 1).toString();
                result.push(Object.assign({}, data));
              return result;
            };
            
            function createHeaders(keys) {
              var result = [];
              for (var i = 0; i < keys.length; i += 1) {
                result.push({
                  id: keys[i],
                  name: keys[i],
                  prompt: keys[i],
                  width: 65,
                  align: "center",
                  padding: 0
                });
              }
              return result;
            }
            
            var headers = createHeaders([
              "Description",
              "ReportedAt",
              "CompletionAt",
              "WorkOrderAmount",
            ]);
              doc.table(8,70,generateData(),headers,{ autoSize:false });              
            }
            doc.save("report"+new Date().getTime()+".pdf");
              return data.data;
          }).catch((error)=>{
              throw error
          });

          console.log('d:',data);
        }
  const HistoryReport=({item})=>{
       
        return(
      <div id="history" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title" id="standard-modalLabel">Vendor Details</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                  </div>
                  <div class="modal-body">
                  
                        {
                            item.map((data,index)=>{
                                let base64='data:image/jpg;base64,'+data.AttachmentFile;
                            return <div class="timeline-alt pb-0" key={index}>
                                                <div class="timeline-item">
                                                <i class="mdi mdi-airplane bg-primary-lighten text-primary timeline-icon"></i>
                                                    <div class="timeline-item-info">
                                                        <a href="#" class="text-info fw-bold mb-1 d-block"></a>
                                                        <small>{data.Remark} {data.AttachmentFile!==''?
                                                            <button className='btn btn-link' style={{padding:0}} onClick={(e) => triggerBase64Download(base64, 'file')}>INFO</button>
                                                            :null
                                                            }</small>
                                                        <p class="mb-0 pb-2">
                                                            <small class="text-muted">{data.LoginName} on {data.RemarkDate}</small>
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                        
                  </div>
                            
                        })}
                        
                        
                  </div>
              </div>
              </div>
            </div>)
      }