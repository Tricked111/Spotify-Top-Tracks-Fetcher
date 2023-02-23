import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import logger from "use-reducer-logger";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const useStyles = makeStyles({
  root: {
    "& .MuiTableRow-root": {
      borderBottom: "2px solid #1DB954", // set the border color to red
    },
    "& .MuiTableCell-root": {
      backgroundColor: "#000000",
    },
    border: "2px solid #1DB954",
  },
});

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, musics: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

function Home() {
  const classes = useStyles();
  const [{ loading, musics }, dispatch] = useReducer(logger(reducer), {
    musics: [],
    loading: true,
  });
  const [artist, setArtist] = useState("XXXTENTACION");

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `http://localhost:5000/api/v1/${artist}}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };
    fetchData();
  }, [artist]);

  function changeArtist(e) {
    setArtist(e.target.value);
  }

  return (
    <div>
      <br></br>
      <div className="d-flex align-items-center justify-content-center">
        <select
          class="form-select"
          aria-label="Default select example"
          style={{ width: "15%" }}
          className="navbar"
          classNamePrefix="select"
          onChange={changeArtist}
        >
          <option selected>XXXTENTACION</option>
          <option value="Drake">Drake</option>
          <option value="Lil Peep">Lil Peep</option>
          <option value="Faceless">Faceless</option>
        </select>
      </div>
      <br></br>
      <div className="d-flex align-items-center justify-content-center ">
        {musics.genres?.map((genres) => (
          <b style={{ color: "#1DB954" }}>{genres}&nbsp;&nbsp;&nbsp;&nbsp;</b>
        ))}
      </div>
      <br></br>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center">
          <Stack spacing={1}>
            {/* <div className="centered-item"> */}
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rounded"
              width={1150}
              height={150}
            />
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rounded"
              width={1150}
              height={150}
            />
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rounded"
              width={1150}
              height={150}
            />
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rounded"
              width={1150}
              height={150}
            />
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rounded"
              width={1150}
              height={150}
            />
            {/*  */}
          </Stack>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center">
          <Container>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                className={classes.root}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <b style={{ color: "#1DB954" }}>Track name</b>
                    </TableCell>
                    <TableCell align="left">
                      <b style={{ color: "#1DB954" }}>Album Name</b>
                    </TableCell>
                    <TableCell align="center">
                      <b style={{ color: "#1DB954" }}>Popularity rating</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {musics.tracks?.map((music) => (
                    <TableRow
                      key={music.track_name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="centr" width="450px">
                        <img
                          src={music.img}
                          alt="for song"
                          style={{ width: 40, height: 40 }}
                        ></img>
                        <b className="white-text">
                          &nbsp;&nbsp;{music.track_name}
                        </b>
                      </TableCell>
                      <TableCell align="centr" width="400px">
                        <b className="white-text">{music.album_name}</b>
                      </TableCell>
                      <TableCell align="center" width="200px">
                        <b className="white-text">{music.popularity}</b>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </div>
      )}
      <br></br>
    </div>
  );
}

export default Home;
