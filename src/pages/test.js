import * as React from "react"

import Layout from '../components/layout.js';

const TestPage = () => {

    return (
        <Layout>
            <br />
            <br />
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8">
                        <h1>Top 10 Drinks for  Winter</h1>
                        <p className="big">For them moments when egg-nog or mulled wine just won’t cut it anymore, you’re going to want some drink ideas on hand. We’ve put together a solid list of drinks that work both as great winter warmers, and stay light after all of that holiday food...</p>
                        <h2>Method</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nisi mauris, molestie ac ipsum vel, dignissim vulputate enim. Vivamus ultricies metus ante, ut convallis felis venenatis in. In tempus a nisi eget aliquam.</p>
                        <p>Mauris vitae sagittis risus. Aliquam sagittis augue quis leo maximus, id rhoncus arcu lobortis. Curabitur suscipit condimentum quam, vel efficitur nisl imperdiet non. Pellentesque tristique id nulla vel pharetra. Aliquam commodo nec eros in posuere. Cras justo mauris, fermentum vel luctus in, maximus sed risus. Donec non nibh id libero lacinia ultricies. Donec nec tempor felis. Aliquam erat volutpat. Sed sagittis ut nisl vitae scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean varius augue vel enim ultrices faucibus.</p>
                        <p>Sed nunc lectus, egestas quis magna finibus, mattis condimentum nisl. Nam faucibus nunc quis varius porttitor. Nunc egestas ante eu nunc molestie efficitur. Curabitur tristique ut erat vel bibendum. Duis finibus, mauris nec efficitur aliquet, sapien risus condimentum justo, nec sagittis diam sem in tortor. Nam tempus suscipit leo, non accumsan libero eleifend ut. Suspendisse potenti. Sed eget leo sit amet ipsum tempor dictum.</p>
                        <h3>Top 10 Drinks to enjoy this  Holiday Season</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nisi mauris, molestie ac ipsum vel, dignissim vulputate enim. Vivamus ultricies metus ante, ut convallis felis venenatis in. In tempus a nisi eget aliquam.</p>
                        <h4>The Classic Margarita</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nisi mauris, molestie ac ipsum vel, dignissim vulputate enim. Vivamus ultricies metus ante, ut convallis felis venenatis in. In tempus a nisi eget aliquam.</p>
                        <p>Mauris vitae sagittis risus. Aliquam sagittis augue quis leo maximus, id rhoncus arcu lobortis. Curabitur suscipit condimentum quam, vel efficitur nisl imperdiet non. Pellentesque tristique id nulla vel pharetra. Aliquam commodo nec eros in posuere. Cras justo mauris, fermentum vel luctus in, maximus sed risus. Donec non nibh id libero lacinia ultricies. Donec nec tempor felis. Aliquam erat volutpat. Sed sagittis ut nisl vitae scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean varius augue vel enim ultrices faucibus.</p>
                        <h5>How do you make a Margarita?</h5>
                        <p>Sed nunc lectus, egestas quis magna finibus, mattis condimentum nisl. Nam faucibus nunc quis varius porttitor. Nunc egestas ante eu nunc molestie efficitur. Curabitur tristique ut erat vel bibendum. Duis finibus, mauris nec efficitur aliquet, sapien risus condimentum justo, nec sagittis diam sem in tortor. Nam tempus suscipit leo, non accumsan libero eleifend ut. Suspendisse potenti. Sed eget leo sit amet ipsum tempor dictum.</p>
                    </div>
                    <div className="col-12 col-md-3 offset-md-1">
                        <hr />
                        <p><span className="text-muted">Last Updated:</span><br />October 4th 2022</p>
                        <p><span className="text-muted">Written by:</span><br />Billy Dawson</p>
                        <small><span className="badge">Holiday Drinks</span> <span className="badge">Top 10</span></small>
                        <hr />

                    </div>
                </div>
            </div>

            
        </Layout>
    )
}

export default TestPage

export const Head = () => <title>Home Page</title>
