import { makeStyles, InputBase, List, ListItem, Box } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getProducts as listProducts } from "../../redux/actions/productActions";
import { useState } from 'react';
import { Link } from 'react-router-dom';

//  makeStyules take an object 
const useStyle = makeStyles((theme) => ({
  search: {
    borderRadius: 2,
    backgroundColor: 'white',
    marginLeft: 10,
    width: '38%',
    display: 'flex',
    color: 'black'

  },
  searchIcon: {
    marginLeft: 'auto',
    padding: 5,
    display: 'flex',
    color: 'blue'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingLeft: 20,
    fontSize: 15,
    width: '100%'
  },
  list: {
    position: 'absolute',
    color: '#000',
    background: '#FFFFFF',
    borderRadius: 2,
    marginTop: 35,
    boxShadow: '0 3px 7px rgba(0,0,0,0.5)',
    width: '36.8%',
    [theme.breakpoints.down('md')]:{
      maxHeight: '900%', 
      overflowX: 'hidden',
      width: '35%'
    }
  },
  searchList: {
    display: 'flex',
    margin: '0 38px 0 2px',
  },
  imgTitleBox:{
    marginLeft: '5%',
  },
  listImage:{
    width: 30
  }
}));



const SearchBar = () => {
  const classes = useStyle();

  const [text, setText] = useState();
  const [open, setOpen] = useState(true);

  const getText = (text) => {
    setText(text);
    setOpen(false);
  }


  const getProducts = useSelector(state => state.getProducts);
  const { products } = getProducts;

  const dispatch = useDispatch();
  // as soon as home component will mount, useEffect will be called and it will call the listProducts and get 
  // list products call the API and the data from DB 
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])


  return (
    <div className={classes.search}>

      <InputBase
        placeholder="Search for products, brands and more"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => getText(e.target.value)}
      />


      <div className={classes.searchIcon}>
        <Search />
      </div>


      {
        text &&
        <List className={classes.list} hidden={open} >
          {
            products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
              <ListItem className={classes.listItems}>
                <Link
                  to={`/product/${product.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  onClick={() => setOpen(true)}
                >
                  <Box className={classes.searchList}  >
                    <Box className={classes.imgBox}>
                      <img src={product.url} alt= '' className={classes.listImage}/>
                    </Box>
                    <Box className={classes.imgTitleBox}>
                      {product.title.longTitle}
                    </Box>
                  </Box>
                </Link>
              </ListItem>
            ))
          }
        </List>
      }
    </div>
  )
}

export default SearchBar;