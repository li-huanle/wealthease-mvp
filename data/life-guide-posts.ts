import type { BlogPost } from './blog-posts';

/**
 * Posts adapted from "高性价比人生指南 / HowToLiveBetter" (Section 5: 不要浪费钱).
 * Source: https://github.com/eternity4719/HowToLiveBetter — licensed CC BY 4.0.
 * Rules and figures describe mainland China as written in the source (2025-2026);
 * all content is educational and not investment advice.
 */

const sourceNote = {
  en: `---

**Source and license:** adapted from *HowToLiveBetter* (高性价比人生指南) by eternity4719, Section 5 "Don't Waste Money", licensed under CC BY 4.0 (https://github.com/eternity4719/HowToLiveBetter). We condensed and translated the original entries; see the source for evidence grades and citations. Rules described here apply to mainland China and may change. This is educational content, not investment, tax or insurance advice.`,
  zh: `---

**来源与许可：** 本文改编自 eternity4719 的《高性价比人生指南》（HowToLiveBetter）第 5 节「不要浪费钱」，原文以 CC BY 4.0 许可发布（https://github.com/eternity4719/HowToLiveBetter）。我们对原条目做了精简改写，证据等级和文献出处请见原书。文中规则针对中国大陆，可能随政策调整。本文仅供学习参考，不构成投资、税务或保险建议。`,
};

export const lifeGuidePosts: BlogPost[] = [
  {
    slug: 'spot-financial-traps-high-yield-installments-crypto',
    title: {
      en: 'Spot the Money Traps: "Guaranteed" Returns, Installment Fees and Crypto',
      zh: '识别理财陷阱：「保本高收益」、分期手续费与虚拟货币',
    },
    excerpt: {
      en: 'Regulators draw lines at 6%, 8% and 10% yields, a "0.6% monthly fee" is really about 13.8% a year, and crypto trades get no legal protection in China. Convert everything to an annual rate before you decide.',
      zh: '监管说收益超过 6% 要打问号、8% 很危险、10% 以上准备赔光；「月费率 0.6%」其实约是年化 13.8%；虚拟货币交易不受法律保护。做决定前先把一切换算成年化利率。',
    },
    content: {
      en: `Most expensive money mistakes share one feature: the real cost or risk is hidden behind a friendly number. Three habits remove most of the danger, and none of them costs a cent.

## Walk away from "high yield", "capital guaranteed" and "can't lose"

Chinese regulators have given ordinary investors a rule of thumb for spotting illegal fundraising: a promised yield above **6%** deserves suspicion, above **8%** is dangerous, and at **10% and higher** you should be prepared to lose your entire principal. Legitimate wealth products are no longer allowed to promise guaranteed principal or returns, and money lost in illegal fundraising is, by rule, borne by the participant, not backstopped by anyone.

These three lines come from regulators' experience rather than statute, and they target products and firms that promise high returns. They are a prompt to stop and check, not a legal test.

## Convert installment fees and credit-card interest to an annual rate

**Minimum payment:** the minimum payment on a credit card is a loan charged daily, roughly 18% a year, and using it cancels the interest-free period.

**Installments:** a plan advertised as "0.6% fee per month" is not 7.2% a year. Because you repay principal every month while the fee keeps being charged on the original amount, the effective annual rate is about **13.8%**.

When comparing two loans, look only at the annual percentage rate. Daily rates and monthly fee rates are designed to look small. Ask for the rate calculated as compound interest; a simple-interest quote must be labelled as such and will look lower. If you truly need to borrow, use a cheaper regular channel instead of rolling a minimum payment forward, and never touch high-interest private lending.

Try it yourself with our [loan calculator](/en/calculators/loan) and [debt payoff calculator](/en/calculators/debt-payoff).

## Don't buy crypto, and don't follow someone who invites you in

Mainland China does not recognise virtual currency as money. A personal purchase can be ruled invalid, and losses are yours: in one reported case a buyer paid about 448,000 yuan for Tether, the platform later refused withdrawals, and the court rejected the lawsuit to recover the money. Theft is a separate matter: in a case from Lianshui, Jiangsu, someone scanned a QR code and about 57,000 USDT (roughly 394,000 yuan) left their wallet, and a court publication argued it should be punished as theft. So always report theft and fraud to the police, but never expect a court to rescue a bad crypto investment.

If you already hold coins, avoid connecting your wallet to unfamiliar sites and periodically review which sites hold transfer permission, since a single "approve" click can let an attacker move your balance without limit.

Never use your own bank card to receive or move money for strangers either; that can become a criminal matter in itself.

## A quick checklist

- Promised yield above 6%, or any "guaranteed" wording: stop.
- Every borrowing offer: ask for the annual rate, not the daily or monthly one.
- Crypto and "signal groups": the cost is the whole amount, and the law will not help you recover it.

${sourceNote.en}`,
      zh: `大多数花冤枉钱的情形都有一个共同点：真实的成本或风险藏在一个看起来很友好的数字后面。养成下面三个习惯，就能避开大部分风险，而且一分钱都不用花。

## 看到「高收益」「保本」「稳赚」直接走开

监管部门在打击非法集资时给过普通人一条经验线：收益率超过 **6%** 就要打问号，超过 **8%** 很危险，**10% 以上**就要准备赔光本金。正规理财已经不许承诺保本保收益了；参加非法集资亏掉的钱，按规定由参与人自己承担，没有人替你兜底。

这三条线是监管者按经验画的，不是法律条文，针对的是承诺高回报的理财产品和投资公司。它是提醒你停下来核查，不是法律上的判断标准。

## 把分期手续费和信用卡利息换算成年化利率

**最低还款：** 信用卡最低还款相当于按天计息的贷款，折合一年约 18%，而且一旦使用，免息期就作废。

**分期：** 写着「每月手续费 0.6%」的分期，不是年化 7.2%。因为本金每月都在还，手续费却一直按最初的本金收，实际年化约为 **13.8%**。

比较两笔贷款，只看年化利率，别看日息和月费率，它们就是被设计成看起来很小的。让对方给出按复利算的年化利率；如果对方给的是单利，按规定要注明「单利」，数字会偏低。真要借钱，优先找利率更低的正规渠道，不要拖着最低还款滚利息，更不要碰高利贷。

可以用我们的[贷款计算器](/zh/calculators/loan)和[债务偿还计算器](/zh/calculators/debt-payoff)自己算一遍。

## 不买比特币、泰达币这类虚拟货币，别人拉你一起投也不跟

国内不承认虚拟货币是钱，个人买币的交易可以被判无效，亏了算自己的。有人向人买泰达币，付了约 44.8 万元，后来平台提不了现，起诉要钱被法院驳回。被偷则是另一回事：江苏涟水有人和对方见面时扫了一个码，钱包里约 5.7 万个泰达币（约 39.4 万元）被转走，人民法院报刊文认为应按盗窃罪处理。所以被偷、被骗要报警，但别指望事后靠起诉把亏掉的投资款要回来。

已经持币的人要防扫码盗币：不熟悉的网站不要连钱包，并定期检查钱包给过哪些网站转币权限，因为点一下「同意」就可能让对方不限数额地转走你的币。

也不要用自己的银行卡替陌生人收钱、买币、转币，这本身就可能被追究刑事责任。

## 速查清单

- 承诺收益超过 6%，或出现「保本」「稳赚」字样：停手。
- 任何借款：问年化利率，不听日息、月费率。
- 虚拟货币和「带单群」：成本是全部本金，亏了法律也不帮你追回。

${sourceNote.zh}`,
    },
    author: 'WealthEase Team',
    date: '2026-10-09',
    readTime: '7 min read',
    category: 'Basics',
    tags: ['scams', 'credit card', 'installment loans', 'APR', 'cryptocurrency', 'China'],
  },
  {
    slug: 'evidence-based-investing-rules-index-funds-low-fees',
    title: {
      en: 'Five Evidence-Based Investing Rules: Trade Less, Pay Less, Diversify',
      zh: '五条有数据支持的投资规矩：少交易、选低费率、别押一处',
    },
    excerpt: {
      en: 'The most active US households earned 11.4% a year while the market made 17.9%. Each extra 1 point of annual fees costs about 18% of your money over 20 years. Here is how to keep more of your returns.',
      zh: '买卖最频繁的美国家庭年收益 11.4%，同期市场是 17.9%；基金费率每高 1 个百分点，20 年后到手的钱少约 18%。看看怎么把收益留在自己手里。',
    },
    content: {
      en: `Investing advice is mostly opinion, but a few rules are backed by solid data. This article only explains how to do the arithmetic; it is not investment advice.

## 1. Trade less, especially when the market is wild

A well-known study of US households found that the **most active traders earned 11.4% a year while the overall market returned 17.9%**, and the gap was almost entirely trading costs. A study of China's 2014-2015 boom and crash found that the smallest 85% of household accounts traded too often and ended up about **250 billion yuan** worse off than if they had simply held, roughly 30% of their principal. In that episode, Chinese household accounts turned over almost 18 times a year, versus about three quarters of a turn for the US households.

The lesson is not "never buy stocks". The more you trade, the lower your take-home return, and the temptation peaks exactly when the market is hottest. (The US data is from the 1990s and China's fee structure differs, but the principle is the same.)

## 2. Don't borrow to invest, and don't buy what you don't understand

When you buy stocks with borrowed money and prices fall below the margin line, you are force-sold. A paper loss becomes a real one on the spot, with no chance to wait for a rebound. Chinese rules require at least six months of account history and an average of 500,000 yuan in assets over the last 20 trading days to open a margin account. That threshold alone tells you it is not meant for ordinary savers. Using credit cards or consumer loans to invest is leverage in disguise.

## 3. Use broad index funds as the long-term core

Actively managed funds collectively hold something very close to the whole market, but the extra management fee comes straight out of your return. Few funds earn back what they charge. This is debated: some researchers argue the standard tests are too harsh on fund managers, and Chinese data is less one-sided than US data (S&P Dow Jones figures to June 2025 show 60.5%, 69.6% and 50.8% of large-cap A-share active funds trailing their benchmark over 1, 3 and 5 years). The conclusion that holds either way: index funds are cheap.

## 4. Within the same type of fund, pick the lower fee

Every extra **1 percentage point** of annual fees leaves you with about **18% less after 20 years** and about **26% less after 30 years**, assuming two funds earn the same before costs. Check management fee + custody fee + sales service fee, and remember purchase and redemption fees too. You can see the effect with our [compound interest calculator](/en/calculators/compound-interest).

## 5. Don't put everything in one stock, one platform or one property

If assets do not all rise and fall together, spreading money across them leaves your average return unchanged and makes your balance swing less. Putting everything in a single stock, platform or house means that if it fails, you fail. Diversification doesn't guarantee you won't lose, and the classic proof is mathematical rather than a measured "how much loss it saves". Buying a broad index fund is the easiest way to diversify.

## And if a stock is falling

Sell by a rule you wrote down in advance rather than averaging down in the hope of recovering your cost.

${sourceNote.en}`,
      zh: `投资建议多半是观点，但有几条规矩背后有扎实的数据。本文只讲怎么算账，不构成投资建议。

## 1. 不频繁交易，行情暴涨暴跌时更要少动手

一项著名的美国家庭研究发现，**买卖最频繁的家庭每年只赚 11.4%，同期整个市场是 17.9%**，差距几乎全是交易成本。国内 2014 到 2015 年那轮暴涨暴跌里，账户最小的 85% 家庭买卖太勤，比一直拿着不动少赚约 **2500 亿元**，约是本金的三成。那段时间国内家庭账户一年换手近 18 次，而美国那批家庭一年只换掉四分之三。

结论不是「别买股票」，而是买卖越勤，到手收益越低，而且最忍不住的时候恰恰是行情最热的时候。（美国数据来自 1990 年代，A 股的佣金和印花税结构也不同，但道理一样。）

## 2. 不借钱投资，不买自己看不懂的

借钱买股票，一旦跌破线又补不上钱，就会被强制卖出。账面亏损当场变成真亏，连「等它涨回来」的机会都没有。监管规定，开户不满半年、最近 20 个交易日日均资产不到 50 万元的人，不能开融资账户，这个门槛本身就说明它不是给普通人用的。用消费贷或信用卡套现去投资，也是变相的杠杆。

## 3. 用宽基指数基金做长期底仓

主动基金合起来买的股票已经非常接近整个市场，但它们多收的管理费是实打实从你的收益里扣的，能靠多赚的部分把自己收的费挣回来的基金很少。这一点有争议：有研究认为常用的检验方法对基金经理过于苛刻；中国的数字也没有美国那么一边倒（标普道琼斯截至 2025 年 6 月的统计，A 股大盘主动基金跑输基准的比例，1 年 60.5%、3 年 69.6%、5 年 50.8%）。但无论哪种结论，指数基金费率低这一点都成立。

## 4. 同类基金优先选费率低的

假设两只基金扣费前赚得一样多，年费率每高 **1 个百分点**，20 年后到手的钱少约 **18%**，30 年后少约 **26%**。买之前看「管理费 + 托管费 + 销售服务费」三项加起来是多少，别忘了申购费、赎回费。可以用我们的[复利计算器](/zh/calculators/compound-interest)直观看到差距。

## 5. 别把钱押在一只股票、一个平台、一套房上

几样东西只要不是完全一起涨一起跌，把钱分开放，平均收益不变，账户的起伏却会小一些。反过来，全押在一处，它出事就等于你全部出事。分散不保证不亏，那篇经典文献也是数学推导，没有给出「能少亏多少」的实测数字。买宽基指数基金本身就是最省事的分散办法。

## 如果股票在下跌

按事先定好的规则卖掉，不要靠往下补仓摊平成本来翻身。

${sourceNote.zh}`,
    },
    author: 'WealthEase Team',
    date: '2026-10-09',
    readTime: '8 min read',
    category: 'Investment',
    tags: ['index funds', 'fund fees', 'diversification', 'trading costs', 'China'],
  },
  {
    slug: 'insurance-and-safety-net-basics-china',
    title: {
      en: 'Insurance and Safety-Net Basics: Emergency Fund, Term Life, Avoiding Surrender Scams',
      zh: '保险与安全垫：应急金、定期寿险，以及别踩代理退保的坑',
    },
    excerpt: {
      en: 'Build 3 to 6 months of expenses first, insure only the losses you cannot absorb, prefer term cover for the earner, and never hand a "surrender agent" your ID and verification codes.',
      zh: '先存 3 到 6 个月生活费，只为扛不住的损失买保险，先给挣钱的人买定期寿险，别把身份证和验证码交给「代理退保」。',
    },
    content: {
      en: `Insurance and savings do the same job from two sides: protecting you from losses you cannot afford. Use them in the right order.

## Step 1: An emergency fund of 3 to 6 months of living costs

Keep it somewhere you can withdraw at any time: a demand deposit, a money-market fund or similar. When you lose a job or fall ill, you won't have to borrow at around 18% a year or sell investments at a loss. Bank deposits are covered by deposit insurance up to 500,000 yuan per depositor per bank. "3 to 6 months" is common rule-of-thumb rather than an official standard; base it on your fixed monthly expenses, not your income. Our [savings goal calculator](/en/calculators/savings-goal) can help you plan how fast to build it.

## Step 2: Insure only losses you cannot absorb

Premiums do not come back in full; part pays the insurer's costs and profit. So insurance is worth buying for rare, expensive events your savings can't cover, such as serious illness, causing injury while driving, or the death of the main earner. Small losses like a cracked phone screen or a delayed flight belong to your emergency fund. Whether to buy critical-illness cover depends on whether your savings could carry you through a year or two of lost income.

## Step 3: Prefer pure protection, and treat "returns" and "dividends" as non-guaranteed

Term or "consumption-type" insurance pays nothing if you make no claim, which feels like wasted money. Policies with refunds or dividends charge you extra premium for the insurer to hold your savings, and the dividend is legally described as a non-guaranteed benefit in bold print on the policy summary. There is a fair counter-argument: for someone who truly cannot save, a refundable policy forces regular saving. The advice here is aimed at people who can manage themselves.

## Step 4: If people depend on your income, insure the earner first

A term life policy covers a fixed number of years and pays your family a lump sum if you die in that period. It matters when a mortgage is outstanding or children are young. Insuring a child's life is a low priority since a child's death does not remove a household income, and the law caps death payouts for minors. With limited money: term life and a one-year medical policy for the earner first, then a medical policy for the child. The author estimates the cost at several hundred to a few thousand yuan a year, with no official figure.

## Step 5: If you want to cancel a policy, do it yourself

Be wary of online ads promising "full refund, no fee unless successful". These are usually illegal surrender agents who take 30% to 50% of the refund and ask for your ID, bank card and verification codes. Cancelling also ends your cover. In one case reported by the Hunan financial regulator, a woman paid an agent a "consultation fee" and was still refunded only the cash value; three months later she was diagnosed with breast cancer and no longer had her critical-illness cover. Call the insurer directly, or use the free cooling-off period for new policies (a policy of more than a year can usually be returned with nearly full premium refund). If you feel you were misled when sold, call the complaint line 12378 for free. Before cancelling, ask about reducing the sum insured or making the policy paid-up instead.

## Bonus: before prepaying a mortgage, run one comparison

Prepaying is the same as earning your mortgage rate with certainty. The only question is whether the after-tax return you can reliably earn elsewhere is higher than your loan rate. If not, or if you're unsure, prepaying makes sense, and early payments save the most interest on equal-installment loans. Keep emergency cash either way and check the contract for prepayment penalties. Our [mortgage calculator](/en/calculators/mortgage) lets you test the numbers.

${sourceNote.en}`,
      zh: `保险和储蓄是从两个方向做同一件事：保护你不被自己扛不住的损失击垮。关键是顺序。

## 第一步：先存 3 到 6 个月生活费的应急金

放在随时能取的地方，比如活期、货币基金。这样失业或生病时，不用去借年化 18% 左右的钱，也不用亏着卖掉手里的投资。银行存款有存款保险，同一家银行最高赔 50 万元。「3 到 6 个月」是通行的经验，没有官方或学术的原始出处，金额按你每月的固定支出算，不按收入算。可以用我们的[储蓄目标计算器](/zh/calculators/savings-goal)规划攒多快。

## 第二步：只给自己扛不住的损失买保险

你交的保费不会全部赔回来，一部分要付保险公司的费用和利润。所以值得买的是很少发生、一旦发生家里掏不出来的损失，比如大病、开车撞伤人、家里挣钱的人走了。碎屏险、航班延误险这类几百元的小损失，用应急金兜着就行。是否要买重疾险，要看存款能不能撑过一两年的停工。

## 第三步：优先买消费型，把「返还」「分红」当作不保证的部分

消费型保险到期不返钱，心里会觉得白花了。而带返还、分红的保险，等于你多交保费让保险公司替你存钱，说明书上必须用加粗字写明「未来的保单红利为非保证利益」。当然也有反方观点：对完全存不下钱的人，返还型保险能逼着你按期交钱。这里的建议针对能管住自己的普通人。

## 第四步：家里有人靠你的收入过日子，先给挣钱的人买定期寿险

定期寿险只保固定年数，这些年里人走了，家里拿到一笔钱。房贷没还完、孩子还小时它最有用。给孩子买的死亡保险优先级低，因为孩子出事不会让家里少一份收入，而且法律还限制了未成年人的身故赔付。钱有限时，先给挣钱的人买定期寿险和一年期医疗险，再轮到孩子的医疗险。作者粗估一年几百到几千元，没有官方数字。

## 第五步：想退保，自己找保险公司办

网上喊「全额退保、不成功不收费」的，多半是非法代理退保，他们要拿走退回款的三到五成，还要你的身份证、银行卡和验证码，退了保，保障也就没了。湖南金融监管局通报过一个案例：一位女士交了「咨询费」，最后还是只退了现金价值，退保三个月后确诊乳腺癌，那份重疾险已经没了。自己打保险公司客服或去柜台办；刚买的保单在犹豫期内退，保费基本全退；觉得被误导了，先找保险公司，谈不拢就打 12378 投诉，全程免费。退保前先问问能不能减额交清。

## 附：提前还房贷之前，先做一道比较题

提前还房贷等于稳稳赚到你的房贷利率。只需要问：你能长期稳定拿到的税后收益，比房贷利率高吗？不高或说不准就还，等额本息前几年利息占比大，越早还省得越多。无论怎么选，都要先留够应急现金，并检查合同里有没有提前还款违约金。可以用我们的[房贷计算器](/zh/calculators/mortgage)试算。

${sourceNote.zh}`,
    },
    author: 'WealthEase Team',
    date: '2026-10-09',
    readTime: '8 min read',
    category: 'Savings',
    tags: ['emergency fund', 'insurance', 'term life insurance', 'mortgage prepayment', 'China'],
  },
  {
    slug: 'china-tax-pension-checklist-reconciliation-private-pension',
    title: {
      en: 'China Tax and Pension Checklist: Annual Reconciliation, Private Pension, Self-Paid Social Insurance',
      zh: '个税与养老清单：年度汇算、个人养老金、灵活就业交社保',
    },
    excerpt: {
      en: 'File your annual individual income tax reconciliation between March and June, open a private pension account only if your tax rate is 10% or more, and understand that even the minimum self-paid pension takes about 10 years to break even.',
      zh: '每年 3 到 6 月做一次个税汇算；税率 10% 以上才值得开个人养老金账户；没单位的人按最低档交养老保险，也要领约 10 年才回本。',
    },
    content: {
      en: `Three tax-and-pension decisions affect the most people in mainland China. All are free to act on; the cost is time or locked-up money.

## Annual individual income tax reconciliation (March to June)

Do it in the Individual Income Tax app; it takes about ten minutes. You are likely to get a refund if you worked only part of the year, changed jobs mid-year, or never filled in special additional deductions (children's education, mortgage interest, rent, supporting parents). If your annual comprehensive income is under 120,000 yuan, or the tax owed is under 400 yuan, you don't need to file. If you do owe tax, filing is mandatory. There are seven special additional deductions: children's education, continuing education, serious illness medical expenses, mortgage interest, housing rent, elderly support, and care for children under 3. You can claim mortgage interest or rent, but not both.

## Private pension account: only worth it for 10%+ taxpayers

You can contribute up to **12,000 yuan a year** before tax. The tax you save per yuan contributed is "your marginal rate minus 3%" (the 3% is taxed when you withdraw). At 12,000 yuan a year, that is about **840 yuan saved at a 10% rate, 2,040 yuan at 20%, 3,240 yuan at 30%**. At a 3% rate the saving is simply paid back on withdrawal, and non-taxpayers actually lose 3% on withdrawal.

The real cost is that the money is **locked until retirement**. You can only withdraw at the statutory pension age, on total loss of work capacity, when settling abroad, or in other cases set by the state. The tax benefit is a one-time gain, so the further you are from retirement the smaller the annual benefit: for a 10% taxpayer, saving 7 fen per yuan over 30 years is only a bit over 0.2% a year; for a 20% taxpayer 10 years out it is about 1.7% a year. It's a tax arrangement, not an investment, and the money inside can still lose value depending on the products you pick. Never lock up your emergency fund for it.

## Self-paid employee pension insurance (no employer)

If you are self-employed or flexibly employed, joining the employee pension scheme at the **lowest contribution tier** and getting the minimum years in is usually the best value. You pay 20% of the contribution base entirely yourself (employees pay 8% while the employer pays 16%), you need 15+ years of contributions (rising gradually toward 20 years from 2030), and the money can't be withdrawn before retirement.

It is worth it but not an instant win: in the source's illustration, contributing at the lowest tier for 15 years and starting to draw at 60 takes **about 10 years to break even**, and extra contributions at higher tiers take about 17 years. Actual payouts depend on local average wages, your tier, the interest credited to your personal account and your retirement year; later pension increases are not included, so true break-even is somewhat earlier. If you die before breaking even, the personal account balance can be inherited and survivors can receive funeral and pension benefits. If you can't afford the lowest tier, the urban-rural resident pension is the fallback.

## Checklist

- Every spring: file the tax reconciliation and fill in your deductions.
- Before opening a private pension account: check your marginal tax rate and how many years you are from retirement.
- Self-employed: weigh pension insurance by years of contribution first, tier second.

Estimate how much you need with our [retirement calculator](/en/calculators/retirement) and see the tax impact with the [tax calculator](/en/calculators/tax).

${sourceNote.en}`,
      zh: `中国大陆影响面最广的三个个税与养老决定，办起来都不花钱，代价是时间，或者把钱锁住。

## 每年 3 到 6 月做一次个税汇算

在「个人所得税」App 上办，十几分钟就完了。这几种人办下来通常能退到钱：全年只干了几个月，年中换过工作，或者子女教育、房贷、房租、赡养老人这些扣除没填。如果全年综合所得不到 12 万元，或该补的税不到 400 元，可以不办；该补税的人则必须办，不办是违法的。专项附加扣除一共七项：子女教育、继续教育、大病医疗、住房贷款利息、住房租金、赡养老人、3 岁以下婴幼儿照护。其中房贷利息和房租只能选一样，不能两样都填。

## 个人养老金账户：税率 10% 及以上才划算

每年最多 **12000 元**能在税前扣掉。你每存进去一元，省下的税是「你那一档税率减 3%」（3% 是领钱时交的税）。一年存满 12000 元，**税率 10% 的人省 840 元，20% 的省 2040 元，30% 的省 3240 元**。税率只有 3% 的人，省下的税领钱时又交回去，白锁到退休；不交个税的人领钱时还要交 3%，是净亏。

真正的代价是这笔钱会**锁到退休**，中途取不出来。只有四种情况能领：达到领取基本养老金的年龄、完全丧失劳动能力、出国（境）定居、国家规定的其他情形。省的税只拿一次，所以离退休越远，摊到每年的好处越小：税率 10% 的人每存一元省 7 分，离退休还有 30 年，摊到每年才 0.2% 多一点；税率 20% 的人离退休 10 年，约每年 1.7%。它是一种税务安排，不是理财，账户里的钱还要自己选产品，也会亏。千万别为了「薅羊毛」把应急金锁进去。

## 没单位的人，自己交职工养老保险

灵活就业、没有单位的人，按**最低档**交、先把年限交够，通常最划算。钱全部自己出，按缴费基数的 20% 交（在单位上班的人是个人 8%、单位 16%）；要交满 15 年以上，2030 年起这个年限逐年往 20 年涨；退休前这笔钱取不出来。

值得交，但不是一交就赚：按原书的算例，最低档交 15 年、60 岁开始领，**约领 10 年回本**，往高档多交的部分要领约 17 年。实际能领多少取决于当地平均工资、缴费档次、个人账户记账利息和退休年份；退休后养老金会往上调，这一点没有算进去，所以实际回本会早一些。还没领够就去世的，个人账户余额可以继承，遗属还能领丧葬补助金和抚恤金。每月交不起最低档的，可以先参加城乡居民养老保险。

## 速查清单

- 每年春天：做个税汇算，把该填的扣除填上。
- 开个人养老金账户之前：先算清自己的税率和离退休还有几年。
- 自己交养老保险：先看年限，再看档次。

可以用我们的[退休规划计算器](/zh/calculators/retirement)估算需要攒多少，用[个税计算器](/zh/calculators/tax)看看税负。

${sourceNote.zh}`,
    },
    author: 'WealthEase Team',
    date: '2026-10-09',
    readTime: '8 min read',
    category: 'Retirement',
    tags: ['individual income tax', 'private pension', 'pension insurance', 'retirement planning', 'China'],
  },
];
