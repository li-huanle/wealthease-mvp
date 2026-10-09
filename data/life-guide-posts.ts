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
  {
    slug: 'renting-and-buying-a-home-in-china-protect-your-money',
    title: {
      en: 'Renting and Buying a Home in China: Nine Rules That Protect Your Money',
      zh: '租房与买房：九条保护钱包的规矩',
    },
    excerpt: {
      en: 'Write the deposit terms into the contract, never pay rent through an agent, check the long-term-rental firm\'s escrow account, and pay home-purchase money only through a supervised account.',
      zh: '押金条款写进合同，租金别经中介手，先查长租公寓的资金监管账户，二手房款只走专用账户。',
    },
    content: {
      en: `Renting is where people most often lose deposits and prepaid rent; buying is where the biggest single sums are at risk. China's Housing Rental Regulations (effective 15 September 2025) and related rules give tenants more protection than most people realise.

## Renting

### 1. Put the deposit amount, refund date and deduction reasons in the contract

The regulation requires landlords who collect a deposit to specify the amount, the return date and the circumstances in which it can be reduced, and says that outside the cases in the contract the landlord may not deduct it without good reason. Photograph and film the flat, and meter readings, when you move out. If the deposit is withheld, complain to the housing rental authority first; for small sums, use small-claims court.

### 2. If you are locked out, cut off or threatened, call the police

Landlords may not use violence, threats or other illegal means to force you to cancel the lease or leave. Water or power cut-offs and changed locks are examples. Call the police and keep the record: it becomes evidence if you later claim losses. Do not confront the landlord yourself.

### 3. Pay the landlord directly, not through the agent

Agencies are prohibited from collecting or paying rent and deposits on the landlord's behalf. Money passing through an agent is one more chance for it to disappear, and if it does you pay rent twice and may be evicted. Check that the payee matches the name on the property certificate, and ask for written authorisation if it doesn't.

### 4. Check a long-term-rental company's escrow account; don't prepay a year for a small discount

Companies that sublet flats must set up and publicly disclose a rental-funds escrow account. A small discount for paying a year upfront does not justify the risk of losing your deposit and the remaining months if the company collapses. A rent loan tied to the lease is worse: if the company disappears, you keep repaying monthly.

### 5. A sale during your lease doesn't end it

Under the Civil Code, a change of ownership during the lease does not affect the lease's validity. The new owner must let you stay to the end of the term, provided you were lawfully in possession; keep the contract, payment records and move-in evidence.

### 6. Check the title and mortgage before signing, and pay only by traceable transfer

The two most common total losses are paying someone who isn't the owner, and renting a flat already mortgaged and later seized. Check ownership and mortgage records at the local property registry, ask the landlord to attend in person (or bring a power of attorney), and require the head landlord's written consent if subletting. Always transfer money and write the purpose in the memo, such as "March rent for Unit X". This is the author's practical advice, not a statutory rule.

### 7. Rent a partitioned room? Don't

The smallest rental unit is the originally designed room; kitchens, bathrooms, balconies and basement storerooms may not be rented as living space, and landlords may not raise rent unilaterally during the term. When a partitioned flat is shut down, the tenant is the one who has to move and often loses the deposit and prepaid rent. Fire safety is also worse: walls block escape routes and a single wiring circuit serves many people.

## Buying

### 8. Used-home payments through an agent must go to a supervised account

The agent regulation requires funds that an agency collects and pays out to move through its dedicated customer settlement account at a bank, not a broker's personal WeChat or bank account. When two agencies cooperate on one deal, only one commission may be charged, and mortgage or title services must be contracted separately with fees disclosed in advance.

### 9. City residents who want a rural home should rent, not buy

State Council and Ministry of Agriculture documents prohibit urban residents from buying homestead land, farmers' houses or "small-property-right" homes. The legal route is a rental, with a maximum term of 20 years, renewable by agreement. Sign a written lease with the household, spelling out term, rent, and what happens to renovations, and never pay many years upfront or agree to "50-year" contracts.

Compare the costs yourself with our [rent vs buy calculator](/en/calculators/rent-vs-buy) and [mortgage calculator](/en/calculators/mortgage).

${sourceNote.en}`,
      zh: `租房最容易亏的是押金和预付的房租，买房最容易出大事的是那笔单笔最大的房款。2025 年 9 月 15 日起施行的《住房租赁条例》以及相关规章，给租客的保护比多数人以为的多。

## 租房

### 1. 押金的数额、退还时间和扣减情形，必须写进合同

行政法规要求收押金的房东在合同里约定押金数额、返还时间和扣减情形，并规定除合同约定的情形外，房东无正当理由不得扣减押金。退租那天要拍照录像，水电燃气表读数也拍下来。押金被无故扣了，先向房屋租赁管理部门投诉，金额不大的走小额诉讼。

### 2. 被断水断电、换锁、上门威胁赶人，先报警留证

房东不得以暴力、威胁或其他非法方式逼你解约或腾退房子。断水断电、换锁都属于此类。遇上先报警，出警记录是你以后要求赔损失的证据，不要自己动手对抗。

### 3. 中介不得代收代付租金和押金，钱直接给房东

房地产经纪机构被禁止代收、代付房租和押金。钱在中介手里过一道，就多一次卷款跑路的机会；真跑了，你租金白交，还可能被房东赶走。付款前核对收款人是不是产权证上的名字，不是本人的要留一份书面授权。

### 4. 租长租公寓先查它的资金监管账户，别图便宜一次性付一年

转租经营的住房租赁企业必须设立资金监管账户并向社会公示。一次性付一年拿到的那点折扣，抵不上企业倒闭时押金和剩余房租一起没的风险。绑定了租金贷更糟：公寓跑了，贷款你还得按月还完。

### 5. 房子租期内被卖掉，租约继续有效

民法典规定「买卖不破租赁」：租赁物在租期内所有权变动，不影响租赁合同的效力。新房东要让你住到期满。前提是你已经合法住在里面，合同、转账记录、入住时间的证据都要留好。

### 6. 签约前核对产权证和抵押情况，所有款项走转账并备注用途

最常见的两种血本无归，一是租金付给了不是产权人的人，二是房子早已抵押、后来被查封。到当地不动产登记中心查产权和抵押，让房东本人到场（来不了的要授权委托书），二房东转租的要有原房东的书面同意。转账备注写「某某房屋某月租金」，出了纠纷就是直接证据。这一条是作者经验，不是法条。

### 7. 别租隔断房

最小的出租单位是原设计的房间，厨房、卫生间、阳台和地下储藏室不能住人，租期内房东也不能单方面随意涨租。违规隔断被查处时，搬家的是租客，押金和已付房租往往拿不回来。安全上也更差：隔断墙常堵住逃生通道，一屋住很多人还共用一条线路。

## 买房

### 8. 二手房让中介代收房款的，必须走中介在银行开的专用账户

经纪管理办法规定，约定由中介代收代付交易资金的，必须通过其在银行开设的客户交易结算资金专用存款账户划转，不能微信转给经纪人个人。两家中介合做一单只能收一份佣金；代办贷款、代办过户要另外签合同，并事先说明收费。

### 9. 城镇户口想搬去乡下住，只租农房，别买宅基地和宅基地上的房子

国务院办公厅和农业农村部的文件明令禁止城镇居民到农村购买宅基地、农民住宅或「小产权房」。合法的路是租农房，租期一次最长 20 年，到期可另行约定。和出租的农户签书面合同，写清租期、租金、能否装修改建以及装修的钱到期怎么算；别签「租 50 年」「租 70 年」这类合同，更别一次付清多年租金。

可以用我们的[租房还是买房计算器](/zh/calculators/rent-vs-buy)和[房贷计算器](/zh/calculators/mortgage)自己算一算。

${sourceNote.zh}`,
    },
    author: 'WealthEase Team',
    date: '2026-10-09',
    readTime: '8 min read',
    category: 'Real Estate',
    tags: ['renting', 'security deposit', 'home buying', 'tenant rights', 'China'],
  },
  {
    slug: 'laid-off-or-unpaid-wages-china-what-to-claim',
    title: {
      en: 'Laid Off or Unpaid? What You Can Claim in China and in What Order',
      zh: '失业了、被欠薪了：能领什么、按什么顺序办',
    },
    excerpt: {
      en: 'Register for unemployment benefits the day you leave, complain to labour inspection and arbitration for free, apply for legal aid, and know that pension years accumulate even if you stop paying.',
      zh: '离职当天就去办失业登记；欠薪先投诉劳动监察再申请仲裁，都不收费；打不起官司申请法律援助；社保断缴养老年限不清零。',
    },
    content: {
      en: `Losing income is stressful enough without losing the benefits you are entitled to. These are the steps that matter most, roughly in order.

## 1. Apply for unemployment insurance online right away

If you and your employer paid in for at least one year and you did not resign voluntarily, you can claim after completing unemployment registration. Entitlement is up to **12 months** for 1 to under 5 years of contributions, **18 months** for 5 to under 10 years, and **24 months** for 10 years or more. While you receive benefits, unemployment insurance pays your employee medical insurance.

Benefits run from the day you register, so a month's delay is a month's money lost. Do not sign a resignation letter saying "personal reasons" — voluntary resignation generally disqualifies you. Benefit levels differ widely by province.

## 2. Unpaid wages: complain to labour inspection, then arbitrate — both are free

Call 12333 or go to the labour inspection office. After a complaint is accepted, the inspection must be completed within 60 working days, and the employer can be ordered to pay by a deadline, failing which it owes an additional 50% to 100%. Next comes labour arbitration, which has a 45-day time limit. Note the difference between "case closed" and "money received": if the company has no assets or the boss has fled, you can win and still not be paid, and there is no official data on how many wage cases ultimately pay out.

Serious arrears can also be a crime: for example, unpaid wages to one person for three months or more above a provincial threshold (5,000 to 20,000 yuan), or to ten or more people above a larger cumulative threshold (30,000 to 100,000 yuan), where the employer still refuses after being ordered to pay. Check your province's exact figure. On construction sites, the general contractor is more useful to pursue than the labour subcontractor. Unlicensed workshops and shops still count as employers; private household work such as a nanny is not an employment relationship and goes through the courts.

## 3. Can't afford a lawyer? Apply for legal aid

Wage claims, maintenance, social insurance or subsistence benefits, and work injury cases fall within legal aid. Call 12348 or visit the local legal aid centre. Since 1 January 2022 you no longer need to go back to your home registration place for a proof of hardship; a truthful statement of your finances is enough.

## 4. Use free public job services, not paid agencies

Public employment service centres and labour markets offer job introductions, career guidance, policy advice and registration at no cost, and the law forbids them from profiting from these services. Registering as unemployed is also the prerequisite for claiming unemployment benefits and for "employment-difficulty" status. If you do day labour, settle wages on the spot and keep a record.

## 5. Ask for employment-difficulty status

Once recognised, you may receive a social insurance subsidy for what you pay yourself (generally capped at two thirds of actual payments, for up to three years), and employers who hire you or place you in a public-benefit job may get subsidies too. Such jobs pay little (around the local minimum wage) but come with social insurance, so they suit a transition. Subsidies are often paid after you pay, so you advance the money.

## 6. A gap in social insurance is not the end of your pension

Pension entitlement is based on cumulative years, not continuous years: a gap does not reset the count, and you can draw a monthly pension once you reach retirement age with 15 accumulated years (the threshold rises by six months a year from 2030 toward 20 years). The real impact of gaps is on purchase, household registration and points-based schemes that require continuous payment. Paying a stranger to "register" you is risky and not recommended.

For help estimating your runway, try our [emergency fund guide](/en/blog/emergency-fund-guide) and [savings goal calculator](/en/calculators/savings-goal).

${sourceNote.en}`,
      zh: `收入断了已经够难受，别再把该拿的保障也漏掉。下面这些步骤，大致按先后顺序排列。

## 1. 失业了，先在线申领失业保险金

单位和你自己交满 1 年、又不是你主动提的辞职，办完失业登记就能领钱。交满 1 年不到 5 年，最多领 **12 个月**；满 5 年不到 10 年，最多 **18 个月**；10 年以上，最多 **24 个月**。领钱这段时间，职工医保由失业保险替你交。

失业保险金从办失业登记那天起算，晚办一个月就少拿一个月。离职时别签「个人原因主动辞职」，主动辞职一般领不了。各省金额差别很大，以参保地公布的为准。

## 2. 被欠薪：先投诉劳动监察，再申请劳动仲裁，两条路都不收费

先打 12333 或去人社局劳动监察投诉，立案后 60 个工作日内查完，能责令公司限期付钱，逾期不付还要多赔 50% 到 100%。再不行申请劳动仲裁，45 天内结案。但「结案」不等于「到账」：公司没财产、老板跑了，赢了也可能拿不到钱，欠薪案最后有多少真到了当事人手里，没有官方数据。

欠薪到一定程度还够刑事立案：欠一个人 3 个月以上且金额达到各省规定的数额（5000 到 2 万元），或者欠 10 人以上累计达到 3 万到 10 万元，责令支付后仍不付的。投诉前查一下本省的具体数额。工地上的农民工，找总包比找包工头管用。没办执照的作坊、店铺照样算用人单位；给家庭干私活（比如当保姆）不算劳动关系，要去法院。

## 3. 打不起官司就申请法律援助

讨薪、要赡养费、要社保或低保待遇、工伤这类案子都在范围内。打 12348，或去当地法律援助中心。2022 年 1 月 1 日起，不用再回原籍开经济困难证明，本人如实说明经济状况就行。

## 4. 找活先用免费的公共就业服务，不找收费中介

就业服务中心、人力资源市场介绍工作、职业指导、政策咨询、办登记全都不收钱，法律还明文不许它们拿这些服务去赚钱。失业登记也是领失业金和认定就业困难人员的前置手续，顺手办掉。干零工按天结账的，当场核对工钱并留下记录。

## 5. 争取就业困难人员认定

认定下来后，自己交社保能拿补贴，原则上不超过实际交的三分之二，最长 3 年；单位招用你或安排你到公益性岗位的，单位那部分社保也有补贴。公益性岗位工资参照当地最低工资，钱不多但带社保，适合过渡。补贴多是先交后补，要先垫钱。

## 6. 社保断缴不要慌

养老金按累计年限算，不按连续年限算，断了不清零，到退休年龄累计满 15 年就能按月领（2030 年起每年提高 6 个月，逐步到 20 年）。真正受影响的是买房、落户、积分这类要求连续缴费的资格。花钱找人「挂靠」代缴，可能钱打水漂，也有法律风险，不建议。

想算算手里的钱能撑多久，可以看我们的[应急金指南](/zh/blog/emergency-fund-guide)和[储蓄目标计算器](/zh/calculators/savings-goal)。

${sourceNote.zh}`,
    },
    author: 'WealthEase Team',
    date: '2026-10-09',
    readTime: '8 min read',
    category: 'Basics',
    tags: ['unemployment insurance', 'unpaid wages', 'legal aid', 'labor arbitration', 'China'],
  },
  {
    slug: 'financial-hardship-safety-net-china-medical-and-living-costs',
    title: {
      en: 'When Money Runs Out: The Safety Net, Medical Bills and Cutting Living Costs',
      zh: '钱不够的时候：救助、医疗费与压低生活成本',
    },
    excerpt: {
      en: 'Temporary relief, subsistence allowance, shelters, 400-yuan resident medical insurance, the right order for serious illness bills, and why housing and food are where to cut first.',
      zh: '临时救助、低保、救助站、每年 400 元的居民医保、大病费用的办理顺序，以及为什么先压住和吃。',
    },
    content: {
      en: `This is the last-resort checklist. Most of these programmes are free to apply for; the hard part is knowing they exist.

## Government help

### Temporary assistance

If a sudden event such as a fire, accident or a family member's serious illness overwhelms basic living, apply at the township government or street office. You do not need to be a subsistence-allowance household. It is usually a one-off payment, and amounts vary widely by place.

### Subsistence allowance (dibao)

If household income divided by members is below the local line and your assets meet the rules, apply in your registered locality. At the end of 2024 the national average line was **798.1 yuan per person per month in cities and 593.9 yuan in rural areas**. The payment is the line minus actual per-person income. Owning a home, car or savings above the local limit, or having children able to support you, may disqualify you. Once approved you also get help paying resident medical insurance, medical assistance, and legal aid without a hardship check.

### Shelters

Rescue shelters provide food and lodging, send the sick to hospital, help contact family, and give transport tickets home if you have no money, generally for up to about 10 days. It is voluntary, not detention, and no cash is given. Tickets are issued for your registered or residence location, so decide where you are going before you ask.

## Medical bills

### Keep resident medical insurance paid (about 400 yuan a year)

Individuals pay from about 400 yuan and the government subsidises roughly 700 yuan per person. Households in extreme hardship can have the premium fully paid and subsistence-allowance households partly paid. A gap has a price: if you did not enrol in the enrolment period or did not pay continuously, there is a 3-month waiting period after you pay, with an extra month for each additional year of gap.

### For a serious illness, follow this order

Register for cross-province treatment in the National Healthcare Security app before admission so you can settle at discharge without paying the whole bill upfront. After basic insurance and major-illness insurance, apply for medical assistance at your township or street office for what you still cannot pay. Employees get a medical period of 3 to 24 months based on years worked, during which the employer cannot dismiss them. Do not use online loans or private high-interest borrowing: courts only protect interest up to four times the one-year LPR, but the principal must still be repaid. Call 120 in an emergency; hospitals may not refuse treatment, and emergency costs are covered first by a disease emergency relief fund.

### Add a one-year medical policy, and look for "guaranteed renewal"

Such a policy covers the part basic insurance doesn't pay, plus lost income. Policies without the words "guaranteed renewal" may be discontinued or repriced next year. Disclose your health honestly, or claims can be refused; after two years from the start of the contract the insurer can no longer cancel it for non-disclosure. Don't stack two reimbursement-style policies, since the same expense can't be claimed twice. Pay for basic insurance first.

## Cut the two biggest costs first

In 2025, food was 29.3% of average national household consumption and housing 21.7%, together more than half, so trimming them has the biggest effect. In the author's experience, converting a daily-rate room or hourly hotel to a month costs more than a shared flat, and cooking at home is cheaper than takeaway. When job hunting, ask whether food and lodging are included: such a job removes both items.

Build a plan with our [budgeting guide](/en/blog/budgeting-guide) and [emergency fund guide](/en/blog/emergency-fund-guide).

${sourceNote.en}`,
      zh: `这是最后一道防线的清单。其中多数项目申请都不花钱，难的是知道它们存在。

## 政府能帮什么

### 突发变故先申请临时救助

家里突然出事，比如火灾、车祸、家人突发重病，把基本生活一时压垮了，可以向乡镇政府或街道办申请临时救助。不要求你已经是低保户。多是一次性发一笔，各地金额差别很大。

### 收入低于当地低保线就申请低保

全家收入除以人数低于当地低保线，家里财产也符合规定，就可以回户籍地申请。2024 年末全国城市低保线平均每人每月 **798.1 元**，农村 **593.9 元**，发的是低保线减去家里每人每月收入的差额。有房有车有存款超标，或子女有能力赡养你，可能批不下来。批下来后，交居民医保有资助，看病能走医疗救助，申请法律援助不查经济困难。

### 走投无路时去救助站

救助站管吃、管住，生病了送医院，帮你联系家里人，没钱回家的发车票，一般住不超过 10 天。自愿来、自愿走，不是收容，也不发现金。车票按户籍地或住所地开，去之前先想清楚要回哪儿。

## 医疗费

### 居民医保每年 400 元不要断

个人一年交 400 元起，财政再按人头补 700 元上下；特困人员全额资助，低保对象定额资助。断缴有代价：没在集中期参保、或没连着交的，交完之后有 3 个月看病不给报，每多断 1 年原则上再多加 1 个月。

### 得了重病，按这个顺序办

跨省住院前先在「国家医保局」公众号里备案，出院直接结算，不用先垫全款。基本医保和大病保险报完之后自己还掏不起的，向乡镇或街道申请医疗救助。在职的按工龄有 3 到 24 个月医疗期，这期间公司不能辞你。网贷和民间高息借款不要碰：法院只保护到一年期 LPR 的 4 倍这条线，超出部分不受保护，本金仍要还。急重伤病没钱也要打 120，医院不得拒绝、推诿或拖延救治，急救费先由疾病应急救助基金付。

### 基本医保之外，配一份一年期医疗险，认准「保证续保」

这类保险补的是医保报完之后你自己要掏的那部分，还有停工的损失。条款里没有「保证续保」四个字的，明年可能停售或涨价。健康状况要如实告知，瞒了会被拒赔；合同成立满两年，保险公司就不能再以你没如实告知为由解除合同。两份按实际花费报销的医疗险同一笔钱不能报两次，别叠着买。先把基本医保交上，再考虑这条。

## 先压最大的两项开销

2025 年全国人均消费里，吃占 29.3%，住占 21.7%，两项加起来过半，压这两项最有效。按作者的经验，日租房、钟点房折算到一个月比合租贵，自己做饭比点外卖便宜。找工作时问清包不包吃住，包的岗位等于把这两大项抹掉。

可以用我们的[预算指南](/zh/blog/budgeting-guide)和[应急金指南](/zh/blog/emergency-fund-guide)做一份计划。

${sourceNote.zh}`,
    },
    author: 'WealthEase Team',
    date: '2026-10-09',
    readTime: '8 min read',
    category: 'Savings',
    tags: ['social safety net', 'medical insurance', 'subsistence allowance', 'cutting expenses', 'China'],
  },
  {
    slug: 'starting-a-small-business-in-china-money-and-legal-basics',
    title: {
      en: 'Starting a Small Business in China: Money and Legal Basics Before You Open',
      zh: '创业开张前的钱与法律账：主体、担保、报税、用人与退场',
    },
    excerpt: {
      en: 'Invest only what you can afford to lose, know when a "limited" company stops being limited, file zero-return taxes, sign employment contracts within a month, and exit properly if it fails.',
      zh: '只投亏得起的钱，搞清「有限」公司什么时候不再有限，没收入也要零申报，一个月内签劳动合同，亏了按程序退场。',
    },
    content: {
      en: `Most small-business disasters are not caused by a bad idea but by personal exposure nobody priced in. These are the money-and-law basics worth settling before you open.

## 1. Put in only money you can afford to lose

A sole proprietor repays debts from their own assets, and if it is unclear whether the business is a household venture, from the whole family's property. Even a limited company is not a guarantee: if it cannot repay creditors, capital you promised but have not yet paid in can be demanded early. Size your investment so that, if it all vanished, you could still pay the mortgage and medical bills. (The source found no verifiable official statistics on how many small firms survive, so it states legal consequences only.)

## 2. Don't sign a personal guarantee for a company loan, and keep your spouse out of it

Banks lending to small companies almost always ask the owner to sign a joint-and-several guarantee. That means a creditor can go straight to you without suing the company first. A "general guarantee" is weaker: the creditor must sue the company and exhaust its assets before coming to you. A spouse who also signs puts the household's assets in the pool, which makes the company's "limited" liability meaningless for you personally. You can still get the loan; just know what you are signing and keep the guaranteed sum within what you can afford to lose.

## 3. Choose the right entity

Sole proprietors and general partners are liable to the end: whatever is owed, they repay. Shareholders of a limited company are liable only up to the capital they committed, but that capital must actually be paid within five years, so registering 1 million yuan can mean a potential 1 million yuan debt. Mixing company and personal accounts can also make "limited" fall away. Keep accounts separate and don't register a big capital figure for show.

## 4. Never be a nominal shareholder or hold shares for someone else

Once your name is on the register you are legally a shareholder. If you committed capital you must pay it in; if other shareholders never paid theirs when the company was formed, you can be asked to cover the shortfall. The business is someone else's but the debt is in your name. Likewise, don't be a nominal legal representative or lend your ID to register a company: the company pays for harm you cause, then can recover from you.

## 5. File tax returns even with zero income

From the day you receive a licence you must file on time, even if you earned nothing: file the form with zeros. Not filing is fined up to 2,000 yuan, and 2,000 to 10,000 yuan if serious. Three months of not filing any tax type makes the system flag you as an "abnormal" taxpayer, and you can no longer issue invoices. Sole proprietors pay business-income personal tax: an advance within 15 days after each month or quarter, and annual reconciliation by 31 March the following year.

## 6. Invoices and small-taxpayer relief

Small-scale VAT payers whose sales are under 100,000 yuan a month (300,000 a quarter) owe no VAT, and the 3% rate was cut to 1% for the same period. But "finding someone to issue invoices to deduct cost" is false invoicing, with up to 3 years in prison and fines of 20,000 to 200,000 yuan. The exemption applies to VAT only; income tax is calculated separately. The VAT law took effect on 1 January 2026 and the thresholds did not change.

## 7. Anyone claiming to be the tax bureau and chasing you is a scammer

Tax authorities never ask for bank card passwords, payment passwords or SMS codes, and never give you an account to pay tax into. Hang up and call 12366, and file only through the official e-tax platform. If you already transferred money, call 110 or 96110 right away to freeze it.

## 8. Contract and payment terms

Write "deposit" in the sense of the legal 定金 (dingjin), not the lookalike 订金 (dingjin, "advance"). Only the former has the double-return rule: if you back out, you lose it; if the other side does, they return double (capped at 20% of the contract value). Specify a penalty amount. Treat credit terms like a loan: you are lending your money interest-free, and it becomes a bad debt if the buyer fails. Check the other party on the National Enterprise Credit Information system first.

## 9. Hiring

If an employee works a month without a written contract, you owe double wages from the second month up to a year. Register social insurance within 30 days of employment; failing to do so can be fined one to three times the contributions due. "Employee voluntarily gives up social insurance" has no legal basis.

## 10. Buy genuine goods and keep paperwork

Selling counterfeit goods can lead to a sentence of up to 3 years if profit reaches 30,000 yuan or sales 50,000 yuan, even if stock never sold. "I didn't know" fails when the buying price is far below market. Keep purchase contracts, invoices and payment records and the supplier's details. Refuse "free" stock from strangers with no paperwork.

## 11. If it fails, exit through the proper procedure

A company with no debts and no unpaid wages, taxes or social insurance can use simplified deregistration: all investors sign a commitment, and after 20 days of public notice without objection it is cancelled. Sole proprietors need 10 days. If you cannot pay your debts, apply for bankruptcy. Leaving the business unattended and failing to file annual reports for two years can lead to the licence being revoked, and the responsible legal representative cannot serve as one for three years.

Plan your numbers with our [ROI calculator](/en/calculators/roi) and [loan calculator](/en/calculators/loan).

${sourceNote.en}`,
      zh: `小生意出大事，多半不是点子不好，而是没人算过个人要担的风险。开张前，这些钱和法律上的账值得先算清楚。

## 1. 只拿亏得起的钱创业，不动家底、不借钱开张

个体户欠的钱，要拿你自己名下的钱和东西还；分不清是不是全家一起做的，就拿全家的财产还。开公司也不保险：公司还不上债，你当初答应出、还没到期的那笔出资，会被要求提前掏出来。所以投多少，按「全亏光也照样还房贷、看病」来定。（原书没找到能核实的官方存活率统计，所以只写法律后果。）

## 2. 不给公司贷款签个人担保，配偶更不要跟着签

签的是「连带责任保证」，公司还不上钱，债主可以绕开公司直接找你要。写「一般保证」才是先告公司、卖完公司财产还差多少才轮到你。配偶跟着签字，两个人的家产一起搭进去，有限公司的「有限」对你个人就不算数了。贷款照样可以贷，只是签字前要弄清这一页签掉的是什么，把担保金额压在「亏得起」的数以内。

## 3. 开张前选对主体

个体户和普通合伙人要赔到底，欠多少还多少。有限公司的股东只赔自己答应出的那个数，但答应了多少，5 年内就要真拿出多少：填 100 万，就是可能欠着 100 万。公司账和自家账混着用，「有限」也会失效。公私分明，注册资本别为了好看填大数。

## 4. 不当挂名股东，不替人代持股权

名字登记在册，你在法律上就是股东。答应出的钱要按期交齐，公司开办时别的股东没真把钱交进来，缺多少你也跟着还。生意是别人做的，债记在你名下。挂名法定代表人、把身份证借给人注册公司同理：法定代表人执行职务造成的损害公司先赔，赔完可以回头找有过错的你追偿。

## 5. 领了执照就有申报义务，没收入也要零申报

不报先罚 2000 元以下，情节严重的罚 2000 到 1 万元。连着三个月所有税种都不报，系统会把你列为非正常户，发票就开不了了。个体工商户和个人独资企业交的是经营所得个税：月度或季度终了后 15 日内先交一笔，次年 3 月 31 日前做汇算清缴。

## 6. 发票只按真实交易开，小规模纳税人用足免税额

小规模纳税人一个月卖不到 10 万、一个季度卖不到 30 万，增值税免了；原本按 3% 交的，同期也减到 1%。反过来，「找人开票抵成本」就是虚开，起步判 3 年以下，还要罚 2 万到 20 万。免的只是增值税，所得税另算。增值税法 2026 年 1 月 1 日起施行，金额门槛没变。

## 7. 自称税务局催你交钱报税的都是骗子

税务部门不会打电话要银行卡密码、支付密码或验证码，也不会给你一个账号让你把税打过去。接到这类电话先挂断，再打 12366，办税只走电子税务局。已经转了钱，立刻打 110 或 96110 止付。

## 8. 合同与收款

收钱写「定金」不写「订金」。只有「定金」有双倍规则：你毁约，钱要不回来；对方毁约，要退你双倍（超过合同金额 20% 的部分不算）。违约金写明数额。给账期等于把自己的钱无息借给对方，对方倒了就是坏账，先去国家企业信用信息公示系统查对方的记录。

## 9. 用人

人来上班满一个月还没签书面合同，从第二个月起每月按双倍发工资，最长算到满一年。社保要在用工 30 天内登记，不办的罚应交社保费的 1 到 3 倍。法律上没有「员工自愿放弃社保」这一项。

## 10. 进货留票据，价格明显偏低的不进

卖假货，获利 3 万或销售额 5 万就够判，判 3 年以下，货压在仓库没卖出去也算。进货价明显低于市场价又说不出理由，就会被认定你知情。留住采购合同、发票、付款记录和上家信息；陌生人白送货、不给票据的，一律不上架。

## 11. 亏了就按程序退场

没欠债、不欠工资税款社保的企业，全体投资人写份承诺，公示 20 天没人提异议就能简易注销；个体户 10 天没异议直接注销。还不上债就申请破产。放着不管、2 年不报年报又联系不上的，会被吊销执照，负有责任的法定代表人 3 年内不能再当法定代表人。

可以用我们的[投资回报率计算器](/zh/calculators/roi)和[贷款计算器](/zh/calculators/loan)先算算账。

${sourceNote.zh}`,
    },
    author: 'WealthEase Team',
    date: '2026-10-09',
    readTime: '9 min read',
    category: 'Basics',
    tags: ['small business', 'personal guarantee', 'tax filing', 'company registration', 'China'],
  },
  {
    slug: 'scam-and-account-safety-china-stop-payment-and-credit-report',
    title: {
      en: 'Scam and Account Safety: Stop Payment Fast, Verify by Callback, Check Your Credit Report',
      zh: '反诈与账户安全：先止付、回拨核实、每年查征信',
    },
    excerpt: {
      en: 'The minutes after a transfer are the only window to freeze it. Never rent out your bank card, never "lend your face" for a loan, and check your credit report twice a year for free.',
      zh: '钱刚转出去的那一小段时间是唯一的窗口；银行卡不外借，别帮人「刷脸」办贷款；每年免费查两次征信。',
    },
    content: {
      en: `Fraud losses are rarely recovered, so the cheapest defence is recognising the pattern before you pay.

## The hard rules

Treat anyone who asks you to transfer money, share your screen, install an unknown app, click a link or read out a verification code as a red flag. Hang up, then call back on an official number. The seven most common scam types are fake order-brushing rebates, fake investment, online loans, fake customer service, impersonating police or prosecutors, "pig-butchering" romance scams, and honey-trap order-brushing. All of them ask you to send money first. Two sentences stop most of them: a real loan never needs a deposit, and the police have no "safe account".

## Seeing a face or hearing a voice is not verification

AI can fake both. Before any transfer, hang up and call back using the number already saved in your contacts, or ask a mutual acquaintance. Don't call back the incoming number or a new number sent in chat. If the other side says "bad signal" or "in a meeting" and won't do a live video call, treat it as a scam.

## Already sent money? Call 110 or 96110 immediately

Right after a transfer is the only window: police can request emergency payment stopping and a rapid freeze, and banks must cooperate. Once the money is moved through layers of accounts it is almost unrecoverable. Call before you investigate on your own. If 96110 calls you, it is the police trying to stop you, so pick up.

## Never lend or rent out cards and accounts

Renting, lending or selling your bank card, SIM or payment account is itself illegal: fines of one to ten times any proceeds (up to 200,000 yuan if there are none), up to 15 days' detention for serious cases, credit-record entries and account restrictions. If you knowingly help someone receive and move criminal funds you can face up to 3 years in prison for assisting information-network crime. "I didn't know what he used it for" is not accepted automatically: payments for your help, or very unusual transaction history, can be used to show you knew. Part-time jobs asking you to collect money, withdraw cash or transfer it pay a few hundred yuan and cost you a criminal record; in one case a person was detained for 10 days and fined 1,000 yuan even though prosecutors did not charge him.

## "Package my documents" loans

Helping others "package" documents to get bank loans for a commission is treated as fraud. In one case, a 126-person ring got over 30 million yuan from more than 80 banks; of 80 people sentenced so far, 76 received terms of 1 year 4 months to 6 years 6 months. Whoever signs is the borrower, and the debt and credit record are theirs.

## "Just lend your face for a verification" (AB loans)

When an acquaintance asks you to "do a face scan" or "witness" something for a loan, or to read out a verification code, you are the borrower, not a guarantor. The bank will chase you after the money goes to your acquaintance, and a written promise from them to repay doesn't bind the bank. If you really want to help, ask exactly what role you are signing as; to guarantee, sign a guarantee contract. If you have been loaned in your name, report to police and call the bank at the number on its official website, keeping chats and transfer records. If your ID is lost, report it immediately and keep the receipt: a Guangzhou Internet Court judgment went against a bank that could not prove the victim herself did the face scan.

## Check your credit report twice a year, free

You get two free reports a year online. Use the People's Bank of China Credit Reference Center website or your mobile bank, not third-party "check your credit" apps, which collect your data. Adverse records stay for 5 years from the end of the matter, and objections must be answered in writing within 20 days. Identity theft for loans is often found only when a mortgage is refused, years later.

## Before you sign anything

Read all of it, ask about what you don't understand, and photograph a copy. Never sign on someone else's behalf or on blank paper, and write the purpose on ID photocopies. An e-signature or face confirmation counts as a signature too.

Learn how to size your emergency buffer with our [emergency fund guide](/en/blog/emergency-fund-guide).

${sourceNote.en.replace('Section 5 "Don\'t Waste Money"', 'Sections 5, 8, 9 and 12')}`,
      zh: `诈骗的钱很少追得回来，所以最便宜的防线是在付钱之前认出套路。

## 反诈硬规则

凡是让你转账、共享屏幕、下载陌生 App、点链接、报验证码的，先挂断，再用官方号码打回去核实。最常见的七类骗局是：刷单返利、虚假投资理财、网络贷款、冒充客服、冒充公检法、杀猪盘、色诱刷单，都是要你先转钱。记住两句就能挡掉一大半：真贷款不需要交保证金，公检法没有「安全账户」。

## 视频里看见脸、电话里听见声音都不算核实

AI 两样都能伪造。涉及转账先挂断，用自己通讯录里存的旧号码打回去，或者找共同认识的人问一句。不要回拨来电显示的号码，也不要用对方在聊天里发来的新号码。对方说「信号不好」「在开会」、不肯当面视频的，直接当骗局处理。

## 发现被骗，立刻打 110 或 96110 要求止付

钱刚转出去的那一小段时间是唯一的窗口，警方可以紧急止付、快速冻结，银行必须配合。等钱被层层转走就基本追不回了。所以先打电话，别先自己去查。96110 打进来的是警察在劝阻你，要接。

## 不把银行卡、手机卡、支付账号借给任何人

把银行卡、手机卡、支付账号租给、借给、卖给别人，本身就违法：罚违法所得的 1 到 10 倍，没有所得的最高罚 20 万元，情节严重的拘留 15 日，还会被记入信用记录、限制账户功能。明知对方犯罪还帮着收钱转钱，就是帮信罪，判 3 年以下。「我不知道他拿去干什么」不一定被采信：收过好处费、流水明显不正常，都可能被认定为知情。让你用自己的卡收钱、取现、转账的「兼职」，挣几百块，代价是一份案底：有人配合转账取款，检察院没起诉，公安仍拘留 10 日、罚 1000 元。

## 「包装材料」贷款，一个都不做

帮人「包装材料」去贷款、拿分成，按诈骗办。有个 126 人的团伙在 80 多家银行骗贷 3000 多万元，已判的 80 人里 76 人判了 1 年 4 个月到 6 年 6 个月。钱贷在谁名下、合同谁签字，谁就是借款人，债和征信记录都是自己的。

## 熟人让你「帮忙刷个脸、做个见证」办贷款（AB 贷）

这其实是用你的名字向银行借钱。借款人是你，不是担保人；钱转给熟人以后，银行照样找你还；熟人写给你的「我来还」承诺书，也管不到银行。真想帮忙，先问清自己在合同上的身份，要担保就以保证人的身份签保证合同。已经被贷了款，先报警，再打放款银行官网上的电话说明情况，留好聊天和转账记录。身份证丢了要马上报警挂失、留好回执：广州互联网法院判过一个案子，银行拿不出她本人刷脸的证据，就输了。

## 每年免费查两次自己的征信报告

每年可在网上免费查两次，十分钟就能查完。用中国人民银行征信中心官网或手机银行，别用第三方的「查征信」App，那类 App 在收集你的信息。不良记录从事情结束那天起留 5 年；有异议可以提，20 天内必须书面答复。身份证被冒用去网贷、办卡，本人往往要到买房贷款被拒才发现，已经拖了好几年。

## 签字之前

把纸从头看到尾，看不懂的当场问，拍照留底。不替人签字，不在空白纸上签，身份证复印件写明用途。电子签和刷脸确认，同样算签字。

可以看看我们的[应急金指南](/zh/blog/emergency-fund-guide)，给自己留一道缓冲。

${sourceNote.zh.replace('第 5 节「不要浪费钱」', '第 5、8、9、12 节')}`,
    },
    author: 'WealthEase Team',
    date: '2026-10-09',
    readTime: '8 min read',
    category: 'Basics',
    tags: ['fraud prevention', 'credit report', 'bank card safety', 'loan scams', 'China'],
  },
  {
    slug: 'iou-guarantees-gifts-and-debts-china-protect-your-money',
    title: {
      en: 'IOUs, Guarantees, Gifts and Debts: Protecting Your Money in Personal Dealings',
      zh: '借条、担保、彩礼与债务：个人之间钱的往来怎么留证据',
    },
    excerpt: {
      en: 'Write a full IOU and pay by transfer, check for the word "joint" before guaranteeing, remember the 3-year limitation period, hide no assets, and treat large gifts as one-way.',
      zh: '借条写全、走转账；担保前看有没有「连带」；时效 3 年；不转移财产；大额赠与交付后原则上要不回。',
    },
    content: {
      en: `Most disputes about money between people come down to paperwork. These habits are cheap and turn an argument into evidence.

## Write a proper IOU

An IOU should name the lender and borrower, the amount, interest rate, term and repayment method, signed by both. Move the money by bank transfer rather than cash, so it can be proved in court. Interest above four times the LPR is not protected by courts. Writing ID numbers and the word "loan" is common good practice.

## Before guaranteeing a debt, look for the word "joint"

With a general guarantee, the creditor must sue the borrower and fail to collect before coming to you. With a joint-and-several guarantee ("连带责任保证"), the creditor can ask you directly. Be sure you would be willing to repay the amount. Also check you are signing a guarantee, not the loan contract itself.

## Limitation periods: 3 years for civil claims, 1 year for labour arbitration

Civil claims must be brought within 3 years of when you knew your rights were harmed. After that, the court won't raise it itself, but a single remark from the other side, "limitation period has passed", is enough, and your money is still owed but can no longer be recovered. A recorded message demanding payment restarts the three years. Labour arbitration is a separate system with a 1-year period. Agreements to "waive the limitation defence" in advance are invalid, and so are agreements to lengthen or shorten the period.

## If you are sued or enforced against, report assets honestly

Moving your house into a company or your money to relatives is exactly what the crime of refusing to enforce a judgment describes: up to 3 years in prison, and 3 to 7 for especially serious cases. Relatives and companies who help are treated as accomplices and the assets can be recovered. Refusing to report or falsely reporting assets can be fined up to 100,000 yuan for an individual and detained for up to 15 days. Genuinely having no money is not a crime, and living costs for you and your dependants are deducted when judging this. Repaying some or all before prosecution, for a minor case, can lead to no prosecution.

## Large gifts between partners are generally one-way

Before the gift is transferred into the recipient's name you can withdraw it freely. After it is, it can be revoked only if the recipient seriously harms you or your close relatives, fails to support you when they should, or fails to perform agreed obligations. So before any large transfer, decide whether it is a loan or a gift, and write that in the message. A notarised gift cannot be taken back at will.

## Betrothal gifts (彩礼)

Demanding money under the guise of marriage is prohibited and courts support return. You can ask for it back if you did not register the marriage, registered but did not actually live together, or the gift left the giver in hardship. If you registered and lived together, generally it is not returned. Pay by transfer with a memo, keep the chat logs, and note that the giving party holds the burden of proof, men and women alike. How "excessive" a gift is depends on local income levels; there is no national figure.

## Gambling debts in the family

Money owed at the gambling table is not protected by courts; neither are loans made by a creditor who knew they would be used for gambling. A loan taken by one spouse to gamble is not treated as a joint marital debt. Keep transfer records and gambling-platform or police records to prove where the money went.

## Don't be a nominal legal representative

Lending your ID to register a company makes you the legal representative. The company pays for harm caused in that role, then can recover from you for fault. Beyond liability, when the company is enforced against, you can be restricted from high consumption. If you are already one, you may resign and the company must appoint a new representative within 30 days.

Run the numbers before lending with our [loan calculator](/en/calculators/loan).

${sourceNote.en.replace('Section 5 "Don\'t Waste Money"', 'Sections 8 and 12')}`,
      zh: `人与人之间钱的纠纷，归根结底是证据问题。下面这些习惯成本很低，却能把一场争吵变成一份证据。

## 借钱写清借条

借条要写全：出借人、借款人、金额、利率、期限、还款方式，双方签名。钱走转账，不给现金，写全了才好起诉。利息超过一年期 LPR 4 倍的部分，法院不保护。借条上写身份证号、注明「借款」是常见的好做法。

## 替人担保前，先看有没有「连带」两个字

一般保证：债权人要先告借款人、执行不到钱，才轮到你。连带责任保证：债权人可以直接找你要。签之前想清楚自己愿不愿意替他还，并看清自己签的是保证合同，不是借款合同本身。

## 维权有期限：民事诉讼时效 3 年，劳动仲裁 1 年

民事诉讼时效 3 年，从你知道权利受损那天算起。过了期，法院不会主动管，但对方在法庭上说一句「超过时效」就够了，钱还在，只是要不回来。一条留了痕迹的催款消息，就能让这 3 年从头重算。事先约定「我不拿时效说事」不算数，两边约定把 3 年改长改短也不算数。劳动争议是另一套，仲裁时效 1 年。

## 被起诉、被执行了，如实报财产

把房子挂到公司名下、把钱转给亲友，正是拒执罪写明的情形，判 3 年以下，情节特别严重的判 3 到 7 年。帮着藏钱过户的亲友和公司按同伙算，钱照样追回。拒绝报告或虚报财产，个人可罚 10 万元以下、拘留 15 日。真没钱不构成这个罪，判断时要先扣掉你自己和被扶养人过日子的必需开销。轻微案件在起诉前还上一部分或全部，可以不起诉。

## 恋爱和婚内的大额赠与，交付之后原则上要不回

东西过到对方名下之前，可以随便撤销。过户完成之后，只有对方严重侵害你或近亲属、该扶养你却不扶养、不履行约定义务这三种情形才撤得掉。所以大额转账前想清楚是借还是送，并在转账留言里写明。公证过的赠与不能说反悔就反悔。

## 彩礼走转账并备注，聊天记录留好

借婚姻索取财物是法律禁止的，法院支持返还。没登记的、登记了但确实没共同生活的、婚前给了彩礼导致给钱一方生活困难的，可以要求返还；已登记又共同生活的一般不返还。彩礼、三金、改口费都走转账并备注用途，谁给的钱谁留证据，男女一样。「数额过高」要看当地人均可支配收入，全国没有统一数字。

## 家里人赌博欠了债，别急着替他还

赌桌上欠的钱，法院不保护；债主明知他借钱去赌还借给他，这笔钱也不保护。一方为赌博借的钱，不能算成夫妻共同债务。要证明钱拿去赌了，得有转账流水、赌博平台记录或公安的处理材料，平时就留着。

## 别当「挂名法人」

把身份证借给人注册公司，你就是法定代表人。法定代表人执行职务造成的损害公司先赔，赔完可以回头向有过错的你追偿；公司被法院执行时，你还可能被限制高消费。已经挂了名的，公司法允许你辞任，公司要在 30 日内定出新的法定代表人。

借钱之前，可以先用我们的[贷款计算器](/zh/calculators/loan)算算账。

${sourceNote.zh.replace('第 5 节「不要浪费钱」', '第 8、12 节')}`,
    },
    author: 'WealthEase Team',
    date: '2026-10-09',
    readTime: '7 min read',
    category: 'Loans',
    tags: ['IOU', 'loan guarantee', 'limitation period', 'betrothal gift', 'China'],
  },
];
