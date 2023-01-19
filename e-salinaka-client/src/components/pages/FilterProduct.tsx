import { Checkbox, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Fragment } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

type Props = {
  setYears: any;
  checked: any;
  setChecked: any;
  years: any;
};

const FilterProduct = ({ setChecked, checked, setYears, years }: Props) => {
  // -------------- filtering --------------------
  const handleChange = (event: SelectChangeEvent) => {
    setYears(event.target.value);
  };

  const handelOnChangeCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <Fragment>
      <Box>
        <Typography>Filter Your Product</Typography>
        <Box
          pt={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="subtitle2">Sort By:</Typography>
          <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Years</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={years}
                label="Years"
                onChange={handleChange}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box>
          <Typography variant="button" pr={5}>
            Category
          </Typography>
          <Box>
            <Typography p={0} m={0}>
              {" "}
              <Checkbox
                value="watch"
                onChange={handelOnChangeCheckBox}
                {...label}
              />{" "}
              Watch{" "}
            </Typography>
            <Typography>
              {" "}
              <Checkbox
                value="shoes"
                onChange={handelOnChangeCheckBox}
                {...label}
              />{" "}
              Shoes{" "}
            </Typography>
            <Typography>
              {" "}
              <Checkbox
                value="t-shat"
                onChange={handelOnChangeCheckBox}
                {...label}
              />{" "}
              T-Shat{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default FilterProduct;
