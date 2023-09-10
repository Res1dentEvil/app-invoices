import './TaskList.scss';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Checkbox, FormControlLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Preloader from '../../assets/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ColorMaterialUI } from '../../services/ColorMaterialUI';
import { formatingDate } from '../../services/formatingDate';
import { getPaymentStatusComponent } from '../../services/getPaymentStatusComponent';
import { getAllTasks } from '../../store/reducers/ActionCreators';
import { MyButton } from '../UI/MyButton/MyButton';
import { filterTasksBySection } from '../../services/filterTasksBySection';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: ColorMaterialUI.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const AllTaskList = () => {
  const dispatch = useAppDispatch();
  const { taskList, taskListBySection, isAuth, isLoading, currentUser } = useAppSelector(
    (state) => state.storeReducer
  );
  const router = useNavigate();

  const buttonValueList = ['Тваринники', 'Рослинники'];
  const [showUncompletedTasks, setShowUncompletedTasks] = useState<boolean>(true);
  const [showCompletedTasks, setShowCompletedTasks] = useState<boolean>(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(taskListBySection.length);
  const [sectionValue, setSectionValue] = useState<string>('all');

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - taskListBySection.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (!currentUser.roles) {
      return;
    } else {
      dispatch(getAllTasks(currentUser.roles[0]));
    }
  }, [isAuth, currentUser.roles]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      {!taskList.length ? (
        <h1 className="task__header"></h1>
      ) : (
        <div className="table-container">
          <div className="table__header">
            <h1 className="task__header">Всі завдання</h1>
            <Button
              variant="outlined"
              onClick={() => {
                router(`/`);
              }}
              sx={{
                borderColor: '#004d40',
                color: '#004d40',
                fontWeight: '600',
              }}
            >
              Переглянути список моїх завдань
            </Button>
          </div>

          <div className="FormControlLabel">
            <FormControlLabel
              control={
                <Checkbox
                  checked={showUncompletedTasks}
                  onChange={() => {
                    setShowUncompletedTasks(!showUncompletedTasks);
                    setShowCompletedTasks(!showCompletedTasks);
                  }}
                />
              }
              label="Відображати тільки незавершені завдання"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showCompletedTasks}
                  onChange={() => {
                    setShowUncompletedTasks(!showUncompletedTasks);
                    setShowCompletedTasks(!showCompletedTasks);
                  }}
                />
              }
              label="Відображати тільки завершені і відхилені завдання"
            />
            <div className="btn-panel">
              {buttonValueList.map((buttonValue) => {
                return (
                  <MyButton
                    key={buttonValue}
                    value={buttonValue}
                    sectionValue={sectionValue}
                    setSectionValue={setSectionValue}
                  />
                );
              })}
            </div>
          </div>
          <Paper sx={{ minWidth: 650, overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 650 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>№</StyledTableCell>
                    <StyledTableCell>Тема</StyledTableCell>
                    <StyledTableCell align="center">Призначено до</StyledTableCell>
                    <StyledTableCell align="center">Відділ</StyledTableCell>
                    <StyledTableCell align="center" id="cell-start-date-th">
                      Початок
                    </StyledTableCell>
                    <StyledTableCell align="center">Кінець</StyledTableCell>
                    <StyledTableCell align="center">Пріоритет</StyledTableCell>
                    <StyledTableCell align="center">Статус оплати</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filterTasksBySection(
                        sectionValue,
                        taskListBySection,
                        showUncompletedTasks,
                        showCompletedTasks
                      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filterTasksBySection(
                        sectionValue,
                        taskListBySection,
                        showUncompletedTasks,
                        showCompletedTasks
                      )
                  ).map((task) => (
                    <StyledTableRow key={task._id}>
                      <StyledTableCell component="th" scope="row">
                        <div className="col-counter">#{task.counter}</div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className="col-description">{task.description}</div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <div className="col-assigned">{task.assigned}</div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <div className="col-section">{task.section}</div>
                      </StyledTableCell>
                      <StyledTableCell align="center" id="cell-start-date">
                        <div className="col-dateStart">{formatingDate(task.dateStart)}</div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <div className="col-dateStart">{formatingDate(task.dateEnd)}</div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <div
                          className={`col-priority ${
                            task.priority == 'Терміновий' && 'high-priority'
                          } `}
                        >
                          {task.priority}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <div className="col-completed">
                          {getPaymentStatusComponent(task.completed)}
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      )}
    </>
  );
};
