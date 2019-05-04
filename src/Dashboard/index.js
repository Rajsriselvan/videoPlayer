import React, { Component } from 'react'
import shaka from 'shaka-player'
import { Card, Row, Col, Layout, Tooltip } from 'antd';
import './style.css'

const {
    Header, Footer, Content,
} = Layout;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: "Turtle Video",
                    description: "About turtle and it's types",
                    url: "https://turtle-tube.appspot.com/t/t2/dash.mpd",
                    img: "turtle.jpg"
                },
                {
                    title: "Sport",
                    description: "Fun and adventurous with parkour skill",
                    url: "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
                    img: "parkour.jpg"
                },
                {
                    title: "Tear of Steel",
                    description: "Sci-Fi drama",
                    url: "http://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd",
                    img: "tearsofsteel.jpg"

                },
            ],
            loadCurrentUrl: 'https://turtle-tube.appspot.com/t/t2/dash.mpd',

        }
        this.handleClick = this.handleClick.bind(this);
        this.initPlayer = this.initPlayer.bind(this);
    }
    componentDidMount() {
        shaka.polyfill.installAll();
        if (shaka.Player.isBrowserSupported()) {
            this.initPlayer();
        } else {
        }
    }

    initPlayer() {
        var { loadCurrentUrl } = this.state;
        var player = new shaka.Player(this.refs.video);
        player.addEventListener('error', this.onErrorEvent);
        player.load(loadCurrentUrl).then(function () {
        }).catch(this.onError);
    }

    onErrorEvent(event) {
        this.onError(event.detail);
    }

    handleClick = (e, data) => {
        var changeUrl = data.url
        this.setState({
            loadCurrentUrl: changeUrl, displayTitle: data.title,
            displayDescription: data.description
        })
    }

    render() {
        const { data, displayTitle, displayDescription } = this.state;
        this.initPlayer()
        return (
            <div className="parentClass"><Layout>
                <Header style={{ color: 'blue' }}>Player</Header>
                <Content>
                    <Row>
                        <Col span={12}>
                            <div className="playerComponent">
                                <video ref="video"
                                    width="640"
                                    height="300"
                                    poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
                                    controls autoPlay
                                >
                                </video>
                            </div>
                            <div>
                                <h1><b>{displayTitle}</b></h1>
                                <p1>{displayDescription}</p1>
                            </div>
                        </Col>
                        <Col span={10} className="col">
                            <div className="cardComponent" >
                                {
                                    data.map(item => (
                                        <Tooltip title="Click to Play">
                                            <div className="outerCard"
                                                onClick={e => this.handleClick(e, item)} >
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
                                        </Tooltip>
                                    ))
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