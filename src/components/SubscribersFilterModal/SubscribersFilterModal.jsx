import React, { useEffect } from 'react';
import {
  Button,
  Checkbox,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider
} from "@mui/material";
import { Autocomplete, LoadingButton } from "@mui/lab";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import { useAppSelector } from "../../app/hooks";
import Box from "@mui/material/Box";
import { ruRU } from '@mui/x-date-pickers/locales';
import Typography from "@mui/material/Typography";
import './subscribersFilterModal.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
}, ruRU,);

const SubscribersFilterModal = ({
  open,
  handleClose,
  handleFilterDataChange,
  getSubscribersByFilters,
  filterData,
}) => {
  const {
    subscribersLoading,
    regions,
    regionsLoading,
    squares,
    squaresWithNames,
    squaresLoading,
    locations,
    locationsWithNames,
    locationsLoading,
    serviceEngineers,
    serviceEngineersLoading,
  } = useAppSelector(state => state.dataState);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const muiCensore = document.querySelector('.MuiPickersLayout-contentWrapper .MuiDateRangeCalendar-root div:first-child');
      
      if (muiCensore && muiCensore.style.zIndex === '100000' && muiCensore.style.pointerEvents === 'none') muiCensore.remove();
    }, 200);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        className='subscribers-filter-modal'
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent
        >
          <Box
            component='form'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
            onSubmit={getSubscribersByFilters}
          >
            <Box>
              <Typography variant='subtitle1'>
                по периоду
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    'DateRangePicker',
                    'DateRangePicker'
                  ]}
                >
                  <DemoItem component='DateRangePicker'>
                    <DateRangePicker
                      value={filterData?.startEndRange}
                      onChange={(value) => handleFilterDataChange({
                        target: {
                          name: 'startEndRange',
                          value
                        }
                      })}
                      format='DD.MM.YYYY'
                      size='small'
                      required
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <Typography variant='subtitle1'>
                по статусу
              </Typography>
              <RadioGroup
                className='abon-type-radio-group'
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                onChange={(_, value) => handleFilterDataChange({
                  target: {
                    name: 'abonType',
                    value
                  }
                })}
                value={filterData.abonType}
              >
                <FormControlLabel
                  value='active'
                  control={<Radio color='success'/>}
                  label='ААБ'
                />
                <FormControlLabel
                  value='nonactive'
                  control={<Radio color='error'/>}
                  label='НАБ'
                />
                <FormControlLabel
                  value='total'
                  control={<Radio color='secondary'/>}
                  label='ОАБ'
                />
                <FormControlLabel
                  value='resolution'
                  control={<Radio color='info'/>}
                  label='Демонтажи'
                />
              </RadioGroup>
            </Box>
            <Box>
              <Typography
                variant='subtitle1'
                gutterBottom
              >
                по объекту
              </Typography>
              <Autocomplete
                multiple
                id='regions-outlined'
                options={regions?.map(region => (
                  {
                    id: region?.id,
                    label: region?.region || region?.id || '*неизвестный регион*',
                  }
                )) || []}
                value={filterData?.regions || []}
                getOptionLabel={(option) => option?.label}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Регионы'
                    placeholder='Регионы'
                  />
                )}
                size='small'
                onChange={(_, value) => handleFilterDataChange({
                  target: {
                    name: 'regions',
                    value,
                  }
                })}
                loading={regionsLoading}
                sx={{ pt: 1 }}
              />
              <Autocomplete
                multiple
                id='squares-outlined'
                options={squares?.map(square => (
                  {
                    id: squaresWithNames?.find(squareWithName => squareWithName?.id === square?.squares_id)?.id,
                    label: squaresWithNames?.find(squareWithName => squareWithName?.id === square?.squares_id)?.squares || square?.squares_id || '*неизвестный квадрат*',
                  }
                )) || []}
                value={filterData?.squares || []}
                getOptionLabel={(option) => option?.label}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Квадраты'
                    placeholder='Квадраты'
                  />
                )}
                size='small'
                onChange={(_, value) => handleFilterDataChange({
                  target: {
                    name: 'squares',
                    value,
                  }
                })}
                loading={squaresLoading}
                sx={{ pt: 1 }}
              />
              <Autocomplete
                multiple
                id='locations-outlined'
                options={locations?.map(location => (
                  {
                    id: locationsWithNames?.find(locationWithName => locationWithName?.id === location?.locations_id)?.id,
                    label: locationsWithNames?.find(locationWithName => locationWithName?.id === location?.locations_id)?.locations || location?.locations_id.toString() || '*неизвестная локация*',
                  }
                )) || []}
                value={filterData?.locations || []}
                getOptionLabel={(option) => option?.label}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Локации'
                    placeholder='Локации'
                  />
                )}
                size='small'
                onChange={(_, value) => handleFilterDataChange({
                  target: {
                    name: 'locations',
                    value,
                  }
                })}
                loading={locationsLoading}
                sx={{ pt: 1 }}
              />
            </Box>
            <Box>
              <Typography
                variant='subtitle1'
                gutterBottom
              >
                по субъекту
              </Typography>
              <Autocomplete
                disablePortal
                options={serviceEngineers?.map(serviceEngineer => (
                  {
                    id: serviceEngineer?.id,
                    label: serviceEngineer?.id.toString(),
                  }
                )) || []}
                renderInput={(params) => <TextField {...params} label='СИ'/>}
                size='small'
                loading={serviceEngineersLoading}
                value={serviceEngineers?.find(serviceEngineer => serviceEngineer?.id === filterData?.service_engineers_id)?.service_engineers_id}
                onChange={(_, value) => handleFilterDataChange({
                  target: {
                    name: 'service_engineers_id',
                    value: serviceEngineers?.find(serviceEngineer => serviceEngineer?.id === value?.id)?.service_engineers_id,
                  }
                })}
              />
            </Box>
            <DialogActions>
              <Button
                onClick={handleClose}
                variant='outlined'
                color='warning'
              >Отмена</Button>
              <LoadingButton
                type='submit'
                variant='contained'
                color='success'
                loading={subscribersLoading}
              >
                Поиск
              </LoadingButton>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default SubscribersFilterModal;