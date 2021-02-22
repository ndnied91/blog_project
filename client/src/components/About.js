import React from 'react'
import { Link } from 'react-router-dom'

import Header from './Header'



class About extends React.Component{


  render(){

    return(
      <div>
            <Header/>
          <div className=" d-flex h-100 text-center">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                  <main className="px-3">
                    <h1 className="title"> Hi Travelers </h1>

                    <p className="lead" style={{paddingRight: '15%', marginLeft: '15%'}}>

                      <section style={{paddingBottom: '35px'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo elit id tellus ullamcorper tempus. Morbi eu tellus est.
                            Pellentesque imperdiet finibus ligula, ac malesuada nisi laoreet sed. Donec quis blandit ligula. Integer viverra aliquet cursus.
                            Proin malesuada metus in dolor vehicula, vitae tincidunt felis laoreet. Donec dapibus, massa ut ornare blandit, nisl diam vulputate enim, at finibus magna turpis a enim.
                            Mauris sodales elementum volutpat. Maecenas et ex nec libero dapibus pretium sit amet non nisl. In leo ligula, scelerisque vel condimentum at, sodales nec mauris.
                            Vestibulum id turpis quam. Nulla venenatis eget lectus sed venenatis. Quisque varius nec est quis varius.
                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin luctus dignissim pretium.
                      </section>


                      <img src="https://pbs.twimg.com/media/Eh7XTyLWoAE1feS.jpg" alt="picture of a cabin " style={{width: '100%' , maxWidth: '600px' , height: '100%' , paddingTop: '15px' , paddingBottom: '15px'}}/ >

                      <section style={{paddingTop: '35px'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo elit id tellus ullamcorper tempus. Morbi eu tellus est.
                            Pellentesque imperdiet finibus ligula, ac malesuada nisi laoreet sed. Donec quis blandit ligula. Integer viverra aliquet cursus.
                            Proin malesuada metus in dolor vehicula, vitae tincidunt felis laoreet. Donec dapibus, massa ut ornare blandit, nisl diam vulputate enim, at finibus magna turpis a enim.
                            Mauris sodales elementum volutpat. Maecenas et ex nec libero dapibus pretium sit amet non nisl. In leo ligula, scelerisque vel condimentum at, sodales nec mauris.
                            Vestibulum id turpis quam. Nulla venenatis eget lectus sed venenatis. Quisque varius nec est quis varius.
                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin luctus dignissim pretium.
                      </section>




                      <section style={{paddingTop: '35px'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo elit id tellus ullamcorper tempus. Morbi eu tellus est.
                            Pellentesque imperdiet finibus ligula, ac malesuada nisi laoreet sed. Donec quis blandit ligula. Integer viverra aliquet cursus.
                            Proin malesuada metus in dolor vehicula, vitae tincidunt felis laoreet. Donec dapibus, massa ut ornare blandit, nisl diam vulputate enim, at finibus magna turpis a enim.


                      </section>

                      <div style={{ paddingTop: "20px"}}>
                        <Link to= "/favorites" ><p style={{fontSize: '25px'}} > Check out some of your favorite travel destinations here </p> </Link>
                      </div>



                    </p>
                  </main>

            </div>
            </div>
       </div>
    )
  }
}




export default About



//
// <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
//   <header class="mb-auto">
//     <div>
//       <h3 class="float-md-start mb-0">Cover</h3>
//       <nav class="nav nav-masthead justify-content-center float-md-end">
//         <a class="nav-link active" aria-current="page" href="#">Home</a>
//         <a class="nav-link" href="#">Features</a>
//         <a class="nav-link" href="#">Contact</a>
//       </nav>
//     </div>
//   </header>
//
//   <main class="px-3">
//     <h1>Cover your page.</h1>
//     <p class="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
//     <p class="lead">
//       <a href="#" class="btn btn-lg btn-secondary fw-bold border-white bg-white">Learn more</a>
//     </p>
//   </main>
//
//   <footer class="mt-auto text-white-50">
//     <p>Cover template for <a href="https://getbootstrap.com/" class="text-white">Bootstrap</a>, by <a href="https://twitter.com/mdo" class="text-white">@mdo</a>.</p>
//   </footer>
// </div>
