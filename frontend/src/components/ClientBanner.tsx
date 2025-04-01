import React from 'react'

const ClientBanner = () => {
    return (

        <div className="main-banner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 align-self-center">
                        <div className="caption header-text">
                            <h6>Welcome to Sweet-cake</h6>
                            <h2>Sweet Cake – Nâng Tầm Hương Vị, Lan Tỏa Yêu Thương 🎂✨</h2>
                            <p>
                                At Sweet Cake, we believe that every cake is not just a dessert but a masterpiece,
                                crafted with care and passion. Using only the finest ingredients and perfected recipes,
                                we create cakes that are soft, flavorful, and unforgettable from the very first bite.
                            </p>
                            <div className="search-input">
                                <form id="search" action="#">
                                    <input type="text" placeholder="Type Something" name="searchKeyword" />
                                    <button role="button">Search Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ClientBanner