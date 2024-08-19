import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select
} from "@mui/material";
import './subscribersFooter.css';

const SubscribersFooter = ({
  paginationData,
  handlePaginationDataChange
}) => {
  
  return (
    <Box className='subscribers-footer'>
      <Pagination
        count={20}
        siblingCount={0}
        variant='outlined'
        sx={{ m: '0 auto' }}
        onChange={(_, value) => handlePaginationDataChange({
          target: {
            name: 'pageNumber',
            value: value,
          }
        })}
      />
      <FormControl className='subscribers-footer-page-size'>
        <InputLabel
          id='demo-simple-select-label'
          variant='standard'
        >элементов на страницу</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name='pageSize'
          value={paginationData?.pageSize}
          label='элементов на страницу'
          onChange={handlePaginationDataChange}
          variant='standard'
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SubscribersFooter;