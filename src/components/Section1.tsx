import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { assets } from "../assets/assets";

const Header = () => {
  const items = [
    { img: assets.awoof, title: "New Arrival" },
    { img: assets.xtra, title: "Unlock Your Deal" },
    { img: assets.bangaDeals, title: "Banger Deals" },
    { img: assets.sportingGoods, title: "Sporting Goods" },
    { img: assets.videoGames, title: "Video Games" },
    { img: assets.groceries, title: "Groceries" },
  ];

  return (
    <div className="fw-bold text-center mt-5 position-relative">
      <video
        src={assets.backgroundVideo}
        autoPlay
        loop
        muted
        className="background-video"
      ></video>
      <div className="content-overlay">
        <Container className="mb-lg-5 fs-1">
          Get your quality and favourite outfit here at an affordable price🎉🥳
        </Container>
        <Carousel className="">
          <Carousel.Item interval={1000}>
            <img
              src={assets.slide1}
              alt=""
              width={800}
              height={400}
              className="rounded-5"
            />
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              src={assets.slide2}
              alt=""
              width={800}
              height={400}
              className="rounded-5"
            />
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              src={assets.slide3}
              alt=""
              width={800}
              height={400}
              className="rounded-5"
            />
          </Carousel.Item>
        </Carousel>

        <div className="d-flex overflow-auto justify-content-center p-3 bg-tertiary  my-lg-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="text-center mx-2 flex-shrink-0"
              style={{ width: "130px" }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="img-fluid rounded-3 mb-2"
              />
              <small>
                <a href="#">{item.title}</a>
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
