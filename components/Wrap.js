import { useState } from 'react';
import useMaker from '../hooks/useMaker';
import {  Grid, Button, Input } from 'theme-ui';

const Wrap = () => {
  const { maker } = useMaker();

  const [wrapAmnt, setWrapAmnt] = useState(null);

  function wrapEth(wrapAmnt) {
    if (wrapAmnt>0)
      maker.service('token').getToken('WETH').deposit(wrapAmnt);
    else
      maker.service('token').getToken('WETH').withdraw(-wrapAmnt);
  }

  return (
    <div>
      <Grid columns={2}>
        <Input placeholder="Amount" sx={{ width: 7 }} onChange={e => setWrapAmnt(e.target.value)}/>
        <Grid columns={2}>
          <Button sx={{ width: 6 , mr: 2 }} onClick={() => {wrapEth(wrapAmnt);}}>Wrap</Button>
          <Button sx={{ width: 6 , mr: 2 }} onClick={() => {wrapEth(-wrapAmnt);}}>Unwrap</Button>
        </Grid>
      </Grid>
    </div>

  );

};
export default Wrap;
