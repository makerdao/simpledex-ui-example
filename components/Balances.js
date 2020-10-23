import { useState, useEffect } from 'react';
import useMaker from '../hooks/useMaker';
import {  Text, Grid, Box, Checkbox, Button } from 'theme-ui';

const MatchingMarket = '0xe325acB9765b02b8b418199bf9650972299235F4';

const Balances = () => {
  const { maker, fetchTokenBalance, web3Connected } = useMaker();

  const [ethBalance, setEthBalance] = useState(null);
  const [wethBalance, setWethBalance] = useState(null);
  const [daiBalance, setDaiBalance] = useState(null);
  const [wethAuth, setWethAuth] = useState(false);
  const [daiAuth, setDaiAuth] = useState(false);

  const approveUnlimited = (token) => {
    maker.service('token').getToken(token).approveUnlimited(MatchingMarket);
  };

  useEffect(() => {
    const fetchBalances = async () => {
      const ethBal = await fetchTokenBalance('ETH');
      const wethBal = await fetchTokenBalance('WETH');
      const daiBal = await fetchTokenBalance('DAI');
      setEthBalance(ethBal.toString());
      setDaiBalance(daiBal.toString());
      setWethBalance(wethBal.toString());
    };

    const checkAuth = () => {
      maker.service('token').getToken('WETH').allowance(maker.currentAddress(),MatchingMarket).then(allow=>setWethAuth(allow.toNumber()>10));
      maker.service('token').getToken('DAI').allowance(maker.currentAddress(),MatchingMarket).then(allow=>setDaiAuth(allow.toNumber()>10));
    };

    if (web3Connected) {
      fetchBalances();
      checkAuth();
    }

    const interval = setInterval(() => {
      if (web3Connected) {
        fetchBalances();
        checkAuth();
      }
    }, 4000);
    return () => clearInterval(interval);

  },[maker,web3Connected,fetchTokenBalance]);

  return (
    <div>
      <Grid
        columns={4}
        sx={{
          borderBottom: '1px solid',
          borderTop: '1px solid',
          borderColor: 'muted',
          px: 2,
          py: 1
        }}
      >
        {['Token','Balance', 'Authorization', 'Approve Unlimited'].map((h, key) => (
          <Text sx={{ fontWeight: 'bold' }} key={key}>
            {h}
          </Text>
        ))}
      </Grid>

      <Box>
        <Grid columns={4} key='eth'>
          <Text>ETH</Text>
          <Text>{ethBalance}</Text>

        </Grid>
        <Grid columns={4} key='weth'>
          <Text>WETH</Text>
          <Text>{wethBalance}</Text>
          <Checkbox checked={wethAuth}/>
          <Button sx={{ width: 6 , mr: 0, lineHeight:1, p:0, mb: 1 }} onClick={() => approveUnlimited('WETH')}>
            Approve
          </Button>
        </Grid>
        <Grid columns={4} key='dai'>
          <Text>DAI</Text>
          <Text>{daiBalance}</Text>
          <Checkbox checked={daiAuth} />
          <Button sx={{ width: 6 , mr: 0,  lineHeight: 1, p:0, mb: 1}} onClick={() => approveUnlimited('DAI')}>
            Approve
          </Button>
        </Grid>
      </Box>
    </div>

  );

};
export default Balances;
