import SearchIcon from "@mui/icons-material/Search";
import { Button, CardActions, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import InputBase from "@mui/material/InputBase";
import Modal from "@mui/material/Modal";
import { alpha, styled } from "@mui/material/styles";
import { Fragment, useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
import ChildModalProduct from "./ChildModalProduct";
import FilterProduct from "./FilterProduct";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "300px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

type Props = {
  open: boolean;
  setOpen: (setOpen: boolean) => void;
};

interface ProductType {
  product: any;
}

export default function ProductModal({ open, setOpen }: Props) {
  // --------------state-------------------------
  const [openChild, setOpenChild] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [refresh, setRefresh] = useState("");
  const [StatusSuccess, setStatusSuccess] = useState("");

  const [productData, setProduct] = useState<ProductType[]>([]);
  const [search, setSearch] = useState("");

  const [years, setYears] = useState("");
  const [checked, setChecked] = useState([""]);

  // --------------------------------
  console.log(productData);

  // ----------- fetch request -----------
  useEffect(() => {
    fetch(
      `http://localhost:6060/api/v1/product/filter?category=${checked}&search=${search}&years=${years}`
    )
      .then((response) => response.json())
      .then((res) => {
        setStatusSuccess(res.status);
        setProduct(res.product);
      });
  }, [years, checked, search, refresh]);
  // years, checked, search

  //----------- modal -----------
  const handleOpenChild = (data: any) => {
    setOpenChild(true);
    setViewData(data);
  };

  // -------------Search---------------
  const handelOnChangeSearch = (event: any) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Grid item xs={12}>
                <FilterProduct
                  setChecked={setChecked}
                  checked={checked}
                  setYears={setYears}
                  years={years}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={9}>
              <Box
                p={1}
                sx={{ backgroundColor: "#c9d1d3", borderRadius: "3px" }}
              >
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={handelOnChangeSearch}
                  />
                </Search>
              </Box>
              <Box>
                <Box pb={1} sx={{ textAlign: "left" }}>
                  <Typography variant="h6">Product</Typography>
                </Box>
                <Box
                  className="Scrollbar"
                  style={{ scrollbarGutter: "stable" }}
                >
                  {StatusSuccess === "success" ? (
                    <Grid container spacing={0}>
                      {productData?.length ? (
                        <Fragment>
                          {productData?.map((data: any, idx: any) => (
                            <Grid xs={12} sm={6} md={3} lg={3} p={1}>
                              <Card sx={{ maxWidth: 345, textAlign: "left" }}>
                                <CardMedia
                                  component="img"
                                  height="100"
                                  image={data.image}
                                  alt="green iguana"
                                />
                                <CardContent style={{ paddingBottom: 0 }}>
                                  <Typography variant="h6" component="div">
                                    {data.name}
                                  </Typography>

                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Category: {data.category}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Year: {data.year}
                                  </Typography>
                                  <Typography variant="subtitle2">
                                    Price:{data.price}
                                  </Typography>
                                </CardContent>
                                <CardActions
                                  style={{
                                    paddingTop: 0,
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Button
                                    onClick={() => handleOpenChild(data)}
                                    size="small"
                                    color="primary"
                                  >
                                    Views Details
                                  </Button>
                                  <ChildModalProduct
                                    openChild={openChild}
                                    setOpenChild={setOpenChild}
                                    viewData={viewData}
                                    setRefresh={setRefresh}
                                  />
                                </CardActions>
                              </Card>
                            </Grid>
                          ))}
                        </Fragment>
                      ) : (
                        <Box
                          sx={{ justifyContent: "center", paddingTop: "50px" }}
                        >
                          <Typography variant="subtitle2">
                            Products Not Fount !!
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                  ) : (
                    <Box sx={{ textAlign: "center" }}>
                      <Blocks
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{ paddingTop: "50px" }}
                        wrapperClass="blocks-wrapper"
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
