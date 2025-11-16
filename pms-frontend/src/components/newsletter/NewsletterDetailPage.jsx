import React from "react";
import { Typography, Carousel, Card } from "antd";
import { useNavigate } from "react-router-dom";
import "../../css/newsletter/NewsletterDetailPage.css";

const { Title, Paragraph } = Typography;

export default function NewsletterDetailPage() {
  const placeholderImages = [
    // Modern condo exterior
    "https://images.pexels.com/photos/5472533/pexels-photo-5472533.jpeg?auto=compress&cs=tinysrgb&w=1200",

    // Contemporary apartment complex with balconies
    "https://images.pexels.com/photos/31656146/pexels-photo-31656146.jpeg?auto=compress&cs=tinysrgb&w=1200",

    // Urban apartment buildings with greenery
    "https://images.pexels.com/photos/34450811/pexels-photo-34450811.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ];

  return (
    <div className="newsletter-content-wrapper">
      <div className="newsletter-container">
        {/* page grid: left list + main content */}
        <div className="newsletter-page-grid">
          <aside className="newsletter-aside">
            <div className="newsletter-aside-title">Other Newsletters</div>
            {/** sample list — replace with real data when available */}
            <div className="newsletter-list">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card
                  key={i}
                  bordered
                  hoverable
                  className="newsletter-list-card"
                >
                  <div className="newsletter-list-item">
                    <div className="newsletter-list-thumb" />
                    <div className="newsletter-list-meta">
                      <div className="newsletter-list-title">
                        Community Update #{i}
                      </div>
                      <div className="newsletter-list-date">
                        Nov. {10 + i}, 2025
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </aside>

          <main className="newsletter-main">
            {/* Image Section */}
            <Card bordered className="newsletter-image-card">
              <Carousel autoplay dots className="newsletter-carousel">
                {placeholderImages.map((url, index) => (
                  <div key={index} className="newsletter-image-wrapper">
                    <img
                      src={url}
                      alt={`img-${index}`}
                      className="newsletter-image"
                    />
                  </div>
                ))}
              </Carousel>
            </Card>

            {/* Lower Section */}
            <div className="newsletter-lower-section">
              {/* Left blank area */}
              <div className="newsletter-side-placeholder" />

              {/* Description */}
              <Card bordered className="newsletter-description-card">
                <Paragraph className="newsletter-description-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  faucibus, lorem et consequat ultrices, justo lorem pretium
                  velit, sed pretium diam nisl sed magna. Integer a orci non
                  lorem placerat sollicitudin. Fusce sed nisl dignissim,
                  fermentum lacus sed, gravida purus. Maecenas feugiat velit id
                  dui rutrum, non accumsan nunc fermentum. Duis tincidunt lacus
                  vitae elit facilisis, vitae tristique sapien imperdiet.
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  faucibus, lorem et consequat ultrices, justo lorem pretium
                  velit, sed pretium diam nisl sed magna. Integer a orci non
                  lorem placerat sollicitudin. Fusce sed nisl dignissim,
                  fermentum lacus sed, gravida purus. Maecenas feugiat velit id
                  dui rutrum, non accumsan nunc fermentum. Duis tincidunt lacus
                  vitae elit facilisis, vitae tristique sapien imperdiet.
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  faucibus, lorem et consequat ultrices, justo lorem pretium
                  velit, sed pretium diam nisl sed magna. Integer a orci non
                  lorem placerat sollicitudin. Fusce sed nisl dignissim,
                  fermentum lacus sed, gravida purus. Maecenas feugiat velit id
                  dui rutrum, non accumsan nunc fermentum. Duis tincidunt lacus
                  vitae elit facilisis, vitae tristique sapien imperdiet. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  faucibus, lorem et consequat ultrices, justo lorem pretium
                  velit, sed pretium diam nisl sed magna. Integer a orci non
                  lorem placerat sollicitudin. Fusce sed nisl dignissim,
                  fermentum lacus sed, gravida purus. Maecenas feugiat velit id
                  dui rutrum, non accumsan nunc fermentum. Duis tincidunt lacus
                  vitae elit facilisis, vitae tristique sapien imperdiet.
                  <br />
                  <br />
                  (This is placeholder description text. Replace with newsletter
                  details from backend.)
                  <br />
                  <br />
                  Management Office
                  <br />
                  Nov.15, 2025
                </Paragraph>
              </Card>

              {/* Right blank area */}
              <div className="newsletter-side-placeholder" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
