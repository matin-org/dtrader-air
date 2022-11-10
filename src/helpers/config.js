export const getContractTypesConfig = (symbol) => ({
  rise_fall: {
    title: "Rise/Fall",
    trade_types: ["CALL", "PUT"],
    basis: ["stake"],
    components: ["start_date"],
    barrier_count: 0,
  },
  //   rise_fall_equal: {
  //     title: "Rise/Fall",
  //     trade_types: ["CALLE", "PUTE"],
  //     basis: ["stake"],
  //     components: ["start_date"],
  //     barrier_count: 0,
  //   },
  //   high_low: {
  //     title: localize("Higher/Lower"),
  //     trade_types: ["CALL", "PUT"],
  //     basis: ["stake", "payout"],
  //     components: ["barrier"],
  //     barrier_count: 1,
  //   },
  //   touch: {
  //     title: localize("Touch/No Touch"),
  //     trade_types: ["ONETOUCH", "NOTOUCH"],
  //     basis: ["stake", "payout"],
  //     components: ["barrier"],
  //   },
  //   end: {
  //     title: localize("Ends In/Ends Out"),
  //     trade_types: ["EXPIRYMISS", "EXPIRYRANGE"],
  //     basis: ["stake", "payout"],
  //     components: ["barrier"],
  //   },
  //   stay: {
  //     title: localize("Stays In/Goes Out"),
  //     trade_types: ["RANGE", "UPORDOWN"],
  //     basis: ["stake", "payout"],
  //     components: ["barrier"],
  //   },
  //   asian: {
  //     title: localize("Asian Up/Asian Down"),
  //     trade_types: ["ASIANU", "ASIAND"],
  //     basis: ["stake", "payout"],
  //     components: [],
  //   },
  //   match_diff: {
  //     title: localize("Matches/Differs"),
  //     trade_types: ["DIGITMATCH", "DIGITDIFF"],
  //     basis: ["stake", "payout"],
  //     components: ["last_digit"],
  //   },
  //   even_odd: {
  //     title: localize("Even/Odd"),
  //     trade_types: ["DIGITODD", "DIGITEVEN"],
  //     basis: ["stake", "payout"],
  //     components: [],
  //   },
  //   over_under: {
  //     title: localize("Over/Under"),
  //     trade_types: ["DIGITOVER", "DIGITUNDER"],
  //     basis: ["stake", "payout"],
  //     components: ["last_digit"],
  //   },
  //   // TODO: update the rest of these contracts config
  //   lb_call: {
  //     title: localize("Close-to-Low"),
  //     trade_types: ["LBFLOATCALL"],
  //     basis: ["multiplier"],
  //     components: [],
  //   },
  //   lb_put: {
  //     title: localize("High-to-Close"),
  //     trade_types: ["LBFLOATPUT"],
  //     basis: ["multiplier"],
  //     components: [],
  //   },
  //   lb_high_low: {
  //     title: localize("High-to-Low"),
  //     trade_types: ["LBHIGHLOW"],
  //     basis: ["multiplier"],
  //     components: [],
  //   },
  //   tick_high_low: {
  //     title: localize("High Tick/Low Tick"),
  //     trade_types: ["TICKHIGH", "TICKLOW"],
  //     basis: [],
  //     components: [],
  //   },
  //   run_high_low: {
  //     title: localize("Only Ups/Only Downs"),
  //     trade_types: ["RUNHIGH", "RUNLOW"],
  //     basis: [],
  //     components: [],
  //   },
  //   reset: {
  //     title: localize("Reset Up/Reset Down"),
  //     trade_types: ["RESETCALL", "RESETPUT"],
  //     basis: [],
  //     components: [],
  //   },
  //   callputspread: {
  //     title: localize("Spread Up/Spread Down"),
  //     trade_types: ["CALLSPREAD", "PUTSPREAD"],
  //     basis: [],
  //     components: [],
  //   },
  //   multiplier: {
  //     title: localize("Multipliers"),
  //     trade_types: ["MULTUP", "MULTDOWN"],
  //     basis: [],
  //     components: [],
  //   }, // hide Duration for Multiplier contracts for now
});
