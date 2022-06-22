import React from 'react'
import Liste_des_reçus_caisse from './Liste_des_reçus_caisse'
import Liste_des_reçus_deposer from './Liste_des_reçus_deposer'
import Liste_des_reçus_verser from './Liste_des_reçus_verser'

export default function Liste_des_reçus () {




    return (
      <div>
        
        <Liste_des_reçus_deposer/>
        <Liste_des_reçus_verser/>
        <Liste_des_reçus_caisse/>
        
      </div>
    )
 
}
