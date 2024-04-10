'use client'

import {useEffect, useState} from "react";

const Tiers = ({tiers, setAmount, setIsTierChosen, tierId, setTierId}) => {
    const [selectedTier, setSelectedTier] = useState(tiers[0])

    useEffect(() => {
        setAmount(tiers[0].price)
    }, [setAmount, tiers]);

    return (
        <div className={"form max-w-[560px]"}>
            {tiers.map((tier, index) => (
                <label key={index} className={"my-6 mx-3 flex flex-row form-input"} for={`tier ${index}`}>
                    <input
                        id={`tier ${index}`}
                        type={"radio"}
                        value={selectedTier}
                        onChange={() => setSelectedTier(tier)}
                        required={true}
                        className={'mr-3'}
                    />
                    <div>{tier.name} (${tier.price})</div>
                </label>
            ))}
            <div className={"text-center my-6 mx-3 flex flex-col"}>
                <button className={"btn btn-submit mb-3 transition-[0.2s]"} onClick={() => {
                    setAmount(selectedTier.price)
                    setIsTierChosen(true)
                    setTierId(selectedTier.id)
                }}>Make Payment</button>
            </div>
        </div>
    )
}

export default Tiers;