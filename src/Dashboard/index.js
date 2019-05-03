import React, { Component } from 'react'
import shaka from 'shaka-player'
import { Card, Row, Col, Layout } from 'antd';
import './style.css'

const {
    Header, Footer, Content,
} = Layout;

var manifestUri = "https://bitmdovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: "Turtle Video",
                    description: "About turtle",
                    url: "https://turtle-tube.appspot.com/t/t2/dash.mpd",
                    img:"turtle.jpg"
                },
                {
                    title: "Sport",
                    description: "Fun and adventurous with parkour skill",
                    url: "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
                    img:"parkour.jpg"
                },
                {
                    title: "Tear of Steel",
                    description: "Sci-Fi drama",
                    url: "http://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd",
                    img:"tearsofsteel.jpg"

                },

            ]
        }
    }
    componentDidMount() {
        // Install built-in polyfills to patch browser incompatibilities.
        shaka.polyfill.installAll();

        // Check to see if the browser supports the basic APIs Shaka needs.
        if (shaka.Player.isBrowserSupported()) {
            // Everything looks good!
            this.initPlayer();
        } else {
            // This browser does not have the minimum set of APIs we need.
            console.error('Browser not supported!');
        }
    }

    initPlayer() {
        var player = new shaka.Player(this.refs.video);

        // Listen for error events.
        player.addEventListener('error', this.onErrorEvent);

        // Try to load a manifest.
        // This is an asynchronous process.
        player.load(manifestUri).then(function () {
            // This runs if the asynchronous load is successful.
            console.log('The video has now been loaded!');
        }).catch(this.onError);  // onError is executed if the asynchronous load fails.
    }

    onErrorEvent(event) {
        // Extract the shaka.util.Error object from the event.
        this.onError(event.detail);
    }

    onError(error) {
        // Log the error.
        console.error('Error code', error.code, 'object', error);
    }

    componentWillUnmount() {
        // unmount stuff
        // kill stream hogging...:)
    }

    handleClick(e, item) {
        console.log("cli", e, item)
    }

    render() {
        const { data } = this.state;
        console.group("ddta", data)
        return (
            <div className="parentClass"><Layout>
                <Header style={{ color: 'blue' }}>Player</Header>
                <Content>
                    <Row>
                        <Col span={12}>
                            <video ref="video"
                                width="640"
                                poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
                                controls autoPlay>
                            </video>
                        </Col>
                        <Col span={10} className="col">
                            <div className="cardComponent" >
                                {
                                    data.map(item =>
                                        <div className="outerCard" value={item}
                                            onClick={(e, item) => this.handleClick(e, item)}>
                                            <Card style={{ borderRadius: '10px' }}>
                                                <div className="img">
                                                    <img src={item.img} height='100' width='100' />
                                                </div>
                                                <div className="content">
                                                    <h1>{item.title}</h1>
                                                    <p>{item.description}</p>
                                                </div>
                                            </Card>
                                        </div>
                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                </Content>
                <Footer>© 2019 Mobiotics</Footer>
            </Layout>
            </div>
        );
    }
} export default Dashboard;