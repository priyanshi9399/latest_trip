import React from "react";
import Banner from "./Banner";
import Homestyle from "../frontend/Homestyle.css";
import { Outlet,Link } from "react-router-dom";



/**
 * @author
 * @function GameListScreen
 **/

const GameListScreen = (props) => {
  return (
    <>

    <section className="money-exch-banner money-exch-banner-parallax">
          <div className="slider_wrap">
            <Banner />
          </div>
        </section>
      
          
          <div class="lottary_div_home_conta gamelist_home">
          <Link to="/color-game" class="">  
            <div class="lottary_div_home">
                <div class="lottery_div_item1">
                  <h3>Win Go</h3>
                  <p>Color Predict Game and win unlimited money</p>
                  </div>
                <div class="lottery_div_item2"><img src="/img/lotterycategory_color.png" height="150%"/></div>
            </div>
            <div class="lottery_price_win_div">Win Member : 4564 </div>
            </Link>
          </div>
         
       

          <div class="lottary_div_home_conta gamelist_home">
            <div class="lottary_div_home">
                <div class="lottery_div_item1">
                  <h3>K4 Lotre</h3>  
                  <p> Win unlimited money</p>
                  </div>
                <div class="lottery_div_item2"><img src="/img/lotterycategory_2.png" height="105%"/></div>
            </div>
            <div class="lottery_price_win_div">Win Member : 4564 </div>
          </div>

          <div class="lottary_div_home_conta gamelist_home">
            <div class="lottary_div_home">
                <div class="lottery_div_item1">
                  <h3>5D Lotre</h3>  
                  <p> Win unlimited money</p>
                  </div>
                <div class="lottery_div_item2"><img src="/img/lotterycategory3.png" height="105%"/></div>
            </div>
            <div class="lottery_price_win_div">Win Member : 4564 </div>
          </div>

          <div class="lottary_div_home_conta gamelist_home">
            <div class="lottary_div_home">
                <div class="lottery_div_item1">
                  <h3>Trg Win</h3>  
                  <p>Color Predict Win unlimited money</p>
                  </div>
                <div class="lottery_div_item2"><img src="/img/lotterycategory_trx3.png" height="105%"/></div>
            </div>
            <div class="lottery_price_win_div">Win Member : 4564 </div>
          </div>
        

    </>
  );
};

export default GameListScreen;
