import React from 'react'

export default function MstTermsCondition() {
  return (
    
    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xl-2 col-lg-8 order-lg-2 order-xl-1"></div>
                            <div class="col-xl-6 col-lg-12 order-lg-2 order-xl-1">
                            <h4 class="header-title mb-3 text-dark" style={{fontWeight:'600',letterSpacing:'1pt'}}>Terms & Conditions</h4>
                                <div class="card">
                                
                                    <div class="card-body">
                                        <form action='#'>
                                        <div>
                                        <label for='terms'>
                                        <h4 class="header-title mt-2 mb-3 text-dark" style={{fontWeight:'600',letterSpacing:'1pt'}}>Enter Terms & Conditions</h4>
                                        </label><p></p>
                                        <textarea id='terms' className='form-control' />
                                        </div><p></p>
                                        <div>
                                          <button type='submit' className='btn btn-primary'>Add</button>
                                        </div>
                                        </form>
                                    </div>
                                  </div>
                            </div>
                        </div>
                        
                        <div className='row g-2'>
                        <div className='mb-3 col-md-2'></div>
                          <div className='mb-3 col-md-6'>
                          <div className='card'>
                            <div className='card-body'>
                           
                            
                            <table className='table table-responsive'>
                              <thead>
                                <tr>
                                  <th><div className='mb-3'>
                              <label>Number of Entries</label>
                              <select className='form-select mb-3'>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                              </select>
                            </div></th>
                            <th>
                            <div className='mb-3'>
                          <label>Search </label>
                              <input type={'text'} className='form-control' />
                          </div>
                            </th>
                                </tr>
                                <tr>
                                  <th>S.No.</th><th colSpan={2}>Terms & Conditions.</th><th>Actions</th>
                                </tr>
                              </thead>
                            </table>
                            </div>
                            </div>
                          </div>
                        </div>
                    </div>
  )
}
