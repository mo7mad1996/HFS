import { Box, Typography } from "@mui/material";

import css from "./style.module.css";

// assets
import blankImg from "@/assets/images/blank.png";
import googlePlay from "@/assets/images/googleplay.png";
import appleStore from "@/assets/images/apple.png";
import card1Bg from "@/assets/images/card1-bg.png";
import card1_vector from "@/assets/images/card1_vector.png";
import card2_vector from "@/assets/images/card2_vector.png";
import card1Bg2 from "@/assets/images/card1_bg2.png";
import cardsBg from "@/assets/images/ProductCardBG2.png";
import cardsB3 from "@/assets/images/CSproductBG.png";
import card2bg from "@/assets/images/card2-bg.png";
import card2bg2 from "@/assets/images/card2-bg2.png";
// import { useEffect } from "react";

function SocietyProducts() {
  return (
    <Box>
      <Box className="container">
        <Typography
          className={css.my_title}
          sx={{
            fontSize: { xs: "50px ", md: "75px" },
            letterSpacing: { xs: "20px", md: "50px" },
            my: 5,
          }}
        >
          SOCIETY
          <br />
          PRODUCTS
        </Typography>
        {/* card 1 */}
        <Box
          className={css.card}
          sx={{
            backgroundImage: `url(${cardsBg})`,
          }}
        >
          {/* left side */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontSize: ".8em", letterSpacing: "11px", zIndex: 4 }}
            >
              EDUCATIONAL
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: "1,2em",

                // lineHeight: "10.35px",
                mb: "40px",
                position: "relative",
                zIndex: 1,
                fontWeight: "700",
                letterSpacing: "10px",
              }}
            >
              TRADING SOCIETY
            </Typography>

            <Typography className={css.text} sx={{ width: { md: "45%" } }}>
              <Typography component="span" sx={{ color: "#E3CB86", pr: "1em" }}>
                TRADING SOCIETY
              </Typography>{" "}
              is more than just an educational platform; it’s a gateway to
              mastering the fast-evolving world of forex. We empower our
              community with cutting-edge tools, expert guidance, and
              comprehensive resources to help you navigate the complexities of
              forex trading with confidence.
            </Typography>

            <Box
              className={css.cardBtns}
              sx={{
                flexDirection: { xs: "column", md: "row", width: "100%" },
              }}
            >
              <Box
                component="a"
                href="https://play.google.com/store/search?q=trading%20society&c=apps"
                target="_blank"
                sx={{
                  flex: 1,
                  cursor: "pointer",
                  display: "block",
                  transition: "400ms transform",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={googlePlay}
                  sx={{ height: "100%", width: "100%" }}
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  cursor: "pointer",
                  // zIndex: "100",
                  transition: "400ms transform",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={appleStore}
                  sx={{ width: "100%", height: "100%", display: "block" }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "380px",
              height: "300px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <Box
              component="img"
              src={card1Bg}
              sx={{ width: "100%", height: "100%" }}
            />
          </Box>

          <Box
            sx={{
              width: "250px",
              height: "250px",
              position: "absolute",
              bottom: "-100px",
              right: "-100px",
              transform: "rotate(150.19 deg)",
            }}
          >
            {/* <Box
              component="img"
              src={card1Bg2}
              sx={{ width: "100%", height: "100%" }}
            /> */}
          </Box>
          <Box
            sx={{
              width: "151px",
              height: "151px",
              position: "absolute",
              top: "0",
              left: "0",
            }}
          >
            <Box
              component="img"
              src={card1_vector}
              sx={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Box>

        {/* card 2 */}
        <Box
          className={css.card}
          sx={{
            backgroundImage: `url(${cardsB3})`,
          }}
        >
          {/* left side */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontSize: ".8em", letterSpacing: "11px" }}
            >
              EDUCATIONAL
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: "1.3em",
                fontWeight: "700",
                letterSpacing: "10px",
              }}
            >
              CYPER SOCIETY
            </Typography>

            <Typography className={css.text} sx={{ width: { md: "45%" } }}>
              <Typography
                component="span"
                sx={{
                  color: "#A26FC4",
                  pr: "1em",
                }}
              >
                Cyper Society
              </Typography>
              is your ultimate learning platform designed to equip you with the
              skills needed to excel in the world of programming. From mastering
              the intricacies of cybersecurity to diving deep into embedded
              systems, web development, and mobile application creation, Cyper
              Society offers comprehensive courses that empower you to shape the
              digital future.
            </Typography>

            <Box
              className={css.cardBtns}
              sx={{
                flexDirection: { xs: "column", md: "row", width: "100%" },
              }}
            >
              <Box
                component="a"
                href="https://play.google.com/store/search?q=trading%20society&c=apps"
                target="_blank"
                sx={{
                  flex: 1,
                  cursor: "pointer",
                  display: "block",
                  transition: "400ms transform",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={googlePlay}
                  sx={{ width: "100%", height: "100%", display: "block" }}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  cursor: "pointer",
                  // zIndex: "100",
                  transition: "400ms transform",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={appleStore}
                  sx={{ width: "100%", height: "100%", display: "block" }}
                />
              </Box>
            </Box>
          </Box>

          {/* right side */}

          <Box
            sx={{
              width: "380px",
              height: "300px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <Box
              component="img"
              src={card2bg}
              sx={{ width: "100%", height: "100%" }}
            />
          </Box>

          <Box
            sx={{
              width: "250px",
              height: "250px",
              position: "absolute",
              bottom: "-60px",
              right: "-70px",
              transform: "rotate(150.19 deg)",
            }}
          >
            {/* <Box
              component="img"
              src={card2bg2}
              sx={{ width: "100%", height: "100%" }}
            /> */}
          </Box>
          <Box
            sx={{
              width: "143px",
              height: "140px",
              position: "absolute",
              top: "0",
              left: "0",
              zIndex: "-1",
            }}
          >
            <Box
              component="img"
              src={card2_vector}
              sx={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SocietyProducts;
