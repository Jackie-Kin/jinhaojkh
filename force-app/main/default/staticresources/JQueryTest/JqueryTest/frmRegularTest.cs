using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;
using System.Text.RegularExpressions;

namespace RegularTest
{
    public partial class frmRegexTest : Form
    {
        public frmRegexTest()
        {
            InitializeComponent();
        }

        private void btnExecute_Click(object sender, EventArgs e)
        {
            DateTime dt = DateTime.Now;
            TimeSpan ts;
            this.txtPassTime.Text = "";
            this.txtTestStatus.Text = "";
            this.txtMatchCount.Text = "";
            this.txtGroupResult.Text = "";
            this.txtTestResult.Text = "";

            try
            {
                if (this.cngReplace.Checked == false)
                {
                    btn_Execute();
                }
                else
                {
                    btn_Execute2();
                }

                ts=DateTime.Now- dt;
                this.txtPassTime.Text = ( ts.Ticks/10000000.0f).ToString("0.00")  + "s";
                this.txtTestStatus.Text = "Test Succeed!";
            }
            catch (Exception ex)
            {
                ts = DateTime.Now - dt;
                this.txtPassTime.Text = (ts.Ticks / 10000000.0f).ToString("0.00") + "s";
                this.txtTestStatus.Text = "Test Failed!";
                this.txtMatchCount.Text = "0";
            }
        }

        private void btn_Execute2() {
            string strContent = "";
            string strPattern = "";
            string strResult = "";
            string strGroupResult = "";

            Regex  rgx ;
            RegexOptions rgxOption = RegexOptions.Compiled;

            btnExecute.Enabled = false;

            txtContent.SelectionStart = 0;
            txtContent.SelectionLength = 0;
            txtContent.SelectionColor = Color.White;

            try
            {
                if (chkIgnore.Checked) {
                    rgxOption = rgxOption | RegexOptions.IgnoreCase;
                }
                if (chkMultiLine .Checked)
                {
                    rgxOption = rgxOption | RegexOptions.Multiline ;
                }
                if (chkSingleLine .Checked )
                {
                    rgxOption = rgxOption | RegexOptions.Singleline ;
                }

                strContent = txtContent.Text.Trim();
                strPattern = txtPattern.Text.Trim();

                rgx = new Regex(strPattern,rgxOption );

                if (!rgx.IsMatch(strContent)) {
                    MessageBox.Show("Match not found!");
                    btnExecute.Enabled = true;
                    return;
                }

                int iGroupCnt;
                int iMatchCnt;

                iMatchCnt = 0;
                txtMatchCount.Text = rgx.Matches(strContent).Count + " match(es)";

                foreach (Match mResult in rgx.Matches(strContent)) {
                    if (iMatchCnt % 2 == 0)
                    {
                        txtContent.SelectionStart = mResult.Index;
                        txtContent.SelectionLength = mResult.Length;
                        txtContent.SelectionBackColor = Color.Yellow;
                    }
                    else {
                        txtContent.SelectionStart = mResult.Index;
                        txtContent.SelectionLength = mResult.Length;
                        txtContent.SelectionBackColor = Color.LightBlue ;
                    }

                    iMatchCnt = iMatchCnt + 1;
                    strResult = strResult + "Result" + iMatchCnt.ToString() + ":" + mResult.Value + Environment.NewLine;
                    iGroupCnt = 0;
                    foreach (Group mGroup in mResult.Groups ) {
                        iGroupCnt = iGroupCnt + 1;
                        strGroupResult = strGroupResult + "Result" + iMatchCnt.ToString() + "的Group" + iGroupCnt.ToString() + ":" + mGroup.Value + Environment.NewLine;
                    }

                    txtMatchResult.Text = strResult;
                    txtGroupResult.Text = strGroupResult;

                    btnExecute.Enabled = true;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Errro!"+Environment.NewLine +ex.Message );
                btnExecute.Enabled = true;
            }
        }

        private void btn_Execute()
        {
            string strContent = "";
            string strPattern = "";
            string strResult = "";
            string strGroupResult = "";
            string strRExpression = "";
            string strTestResult = "";

            strContent = txtContent.Text.Trim();
            strPattern = txtPattern.Text.Trim();
            strRExpression = this.txtRExpression.Text.Trim();

            Regex rgx;
            RegexOptions rgxOption = RegexOptions.Compiled;

            btnExecute.Enabled = false;

            txtContent.SelectionStart = 0;
            txtContent.SelectionLength = 0;
            txtContent.SelectionColor = Color.White;

            try
            {
                if (chkIgnore.Checked)
                {
                    rgxOption = rgxOption | RegexOptions.IgnoreCase;
                }
                if (chkMultiLine.Checked)
                {
                    rgxOption = rgxOption | RegexOptions.Multiline;
                }
                if (chkSingleLine.Checked)
                {
                    rgxOption = rgxOption | RegexOptions.Singleline;
                }

                rgx = new Regex(strPattern, rgxOption);

                strTestResult = Regex.Replace(strContent,strPattern,strRExpression );

                int iGroupCnt;
                int iMatchCnt;

                iMatchCnt = 0;
                txtMatchCount.Text = rgx.Matches(strContent).Count + " match(es)";

                foreach (Match mResult in rgx.Matches(strContent))
                {
                    if (iMatchCnt % 2 == 0)
                    {
                        txtContent.SelectionStart = mResult.Index;
                        txtContent.SelectionLength = mResult.Length;
                        txtContent.SelectionBackColor = Color.Yellow;
                    }
                    else
                    {
                        txtContent.SelectionStart = mResult.Index;
                        txtContent.SelectionLength = mResult.Length;
                        txtContent.SelectionBackColor = Color.LightBlue;
                    }

                    iMatchCnt = iMatchCnt + 1;
                    strResult = strResult + "Result" + iMatchCnt.ToString() + ":" + mResult.Value + Environment.NewLine;
                    iGroupCnt = 0;
                    foreach (Group mGroup in mResult.Groups)
                    {
                        iGroupCnt = iGroupCnt + 1;
                        strGroupResult = strGroupResult + "Result" + iMatchCnt.ToString() + "的Group" + iGroupCnt.ToString() + ":" + mGroup.Value + Environment.NewLine;
                    }

                    txtMatchResult.Text = strResult;
                    txtGroupResult.Text = strGroupResult;
                    txtTestResult.Text = strTestResult;

                    btnExecute.Enabled = true;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Errro!" + Environment.NewLine + ex.Message);
                btnExecute.Enabled = true;
            }
        }

        private void frmRegexTest_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode ==Keys.F5 ) {
                btnExecute_Click(null, null);
            }
        }

        private void frmRegexTest_Load(object sender, EventArgs e)
        {
            txtPassTime.Text = "";
            txtContent.Text = "";
            txtGroupResult.Text = "";
            txtMatchResult.Text = "";
            txtRExpression.Visible = false;
            lblRExpression.Visible = false;
            lblTestResult.Visible = false;
            txtTestResult.Visible = false;
            txtPattern.Width = 1028;
            txtContent.Width = 1028;
        }

        private void cngReplace_CheckedChanged(object sender, EventArgs e)
        {
            if (cngReplace.Checked)
            {
                txtRExpression.Visible = true;
                lblRExpression.Visible = true;
                lblTestResult.Visible = true;
                txtTestResult.Visible = true;
                txtPattern.Width = 1028 / 2;
                txtContent.Width = 1028 / 2;
            }
            else {
                txtRExpression.Visible = false;
                lblRExpression.Visible = false;
                lblTestResult.Visible = false;
                txtTestResult.Visible = false;
                txtPattern.Width = 1028;
                txtContent.Width = 1028;
            }
        }
    }
}
