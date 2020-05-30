export const CurentPos = data => dispatch => {
  dispatch({
    type: 'CURENT_POS',
    payload: data
  })
}