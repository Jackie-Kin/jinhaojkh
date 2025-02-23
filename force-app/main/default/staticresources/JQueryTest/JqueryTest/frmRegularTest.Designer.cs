namespace RegularTest
{
    partial class frmRegexTest
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要修改
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.txtPattern = new System.Windows.Forms.TextBox();
            this.chkIgnore = new System.Windows.Forms.CheckBox();
            this.chkMultiLine = new System.Windows.Forms.CheckBox();
            this.chkSingleLine = new System.Windows.Forms.CheckBox();
            this.cngReplace = new System.Windows.Forms.CheckBox();
            this.btnExecute = new System.Windows.Forms.Button();
            this.txtContent = new System.Windows.Forms.RichTextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.txtMatchResult = new System.Windows.Forms.RichTextBox();
            this.txtGroupResult = new System.Windows.Forms.RichTextBox();
            this.txtTestStatus = new System.Windows.Forms.TextBox();
            this.txtMatchCount = new System.Windows.Forms.TextBox();
            this.txtPassTime = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.lblRExpression = new System.Windows.Forms.Label();
            this.txtRExpression = new System.Windows.Forms.TextBox();
            this.txtTestResult = new System.Windows.Forms.RichTextBox();
            this.lblTestResult = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(13, 13);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(152, 18);
            this.label1.TabIndex = 0;
            this.label1.Text = "Regex Expression";
            // 
            // txtPattern
            // 
            this.txtPattern.Location = new System.Drawing.Point(16, 45);
            this.txtPattern.Name = "txtPattern";
            this.txtPattern.Size = new System.Drawing.Size(1028, 28);
            this.txtPattern.TabIndex = 1;
            // 
            // chkIgnore
            // 
            this.chkIgnore.AutoSize = true;
            this.chkIgnore.Location = new System.Drawing.Point(16, 91);
            this.chkIgnore.Name = "chkIgnore";
            this.chkIgnore.Size = new System.Drawing.Size(133, 22);
            this.chkIgnore.TabIndex = 2;
            this.chkIgnore.Text = "Ignore Case";
            this.chkIgnore.UseVisualStyleBackColor = true;
            // 
            // chkMultiLine
            // 
            this.chkMultiLine.AutoSize = true;
            this.chkMultiLine.Location = new System.Drawing.Point(163, 91);
            this.chkMultiLine.Name = "chkMultiLine";
            this.chkMultiLine.Size = new System.Drawing.Size(124, 22);
            this.chkMultiLine.TabIndex = 2;
            this.chkMultiLine.Text = "Multi Line";
            this.chkMultiLine.UseVisualStyleBackColor = true;
            // 
            // chkSingleLine
            // 
            this.chkSingleLine.AutoSize = true;
            this.chkSingleLine.Location = new System.Drawing.Point(318, 91);
            this.chkSingleLine.Name = "chkSingleLine";
            this.chkSingleLine.Size = new System.Drawing.Size(133, 22);
            this.chkSingleLine.TabIndex = 2;
            this.chkSingleLine.Text = "Single Line";
            this.chkSingleLine.UseVisualStyleBackColor = true;
            // 
            // cngReplace
            // 
            this.cngReplace.AutoSize = true;
            this.cngReplace.Location = new System.Drawing.Point(465, 91);
            this.cngReplace.Name = "cngReplace";
            this.cngReplace.Size = new System.Drawing.Size(142, 22);
            this.cngReplace.TabIndex = 2;
            this.cngReplace.Text = "Replace Mode";
            this.cngReplace.UseVisualStyleBackColor = true;
            this.cngReplace.CheckedChanged += new System.EventHandler(this.cngReplace_CheckedChanged);
            // 
            // btnExecute
            // 
            this.btnExecute.Location = new System.Drawing.Point(922, 91);
            this.btnExecute.Name = "btnExecute";
            this.btnExecute.Size = new System.Drawing.Size(122, 48);
            this.btnExecute.TabIndex = 3;
            this.btnExecute.Text = "Execute";
            this.btnExecute.UseVisualStyleBackColor = true;
            this.btnExecute.Click += new System.EventHandler(this.btnExecute_Click);
            // 
            // txtContent
            // 
            this.txtContent.Location = new System.Drawing.Point(16, 170);
            this.txtContent.Name = "txtContent";
            this.txtContent.Size = new System.Drawing.Size(1028, 314);
            this.txtContent.TabIndex = 4;
            this.txtContent.Text = "";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(16, 133);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(89, 18);
            this.label2.TabIndex = 5;
            this.label2.Text = "Test Text";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(16, 509);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(116, 18);
            this.label3.TabIndex = 6;
            this.label3.Text = "Match result";
            // 
            // txtMatchResult
            // 
            this.txtMatchResult.Location = new System.Drawing.Point(16, 539);
            this.txtMatchResult.Name = "txtMatchResult";
            this.txtMatchResult.Size = new System.Drawing.Size(511, 250);
            this.txtMatchResult.TabIndex = 7;
            this.txtMatchResult.Text = "";
            // 
            // txtGroupResult
            // 
            this.txtGroupResult.Location = new System.Drawing.Point(533, 539);
            this.txtGroupResult.Name = "txtGroupResult";
            this.txtGroupResult.Size = new System.Drawing.Size(511, 250);
            this.txtGroupResult.TabIndex = 7;
            this.txtGroupResult.Text = "";
            // 
            // txtTestStatus
            // 
            this.txtTestStatus.Location = new System.Drawing.Point(16, 809);
            this.txtTestStatus.Name = "txtTestStatus";
            this.txtTestStatus.ReadOnly = true;
            this.txtTestStatus.Size = new System.Drawing.Size(550, 28);
            this.txtTestStatus.TabIndex = 8;
            // 
            // txtMatchCount
            // 
            this.txtMatchCount.Location = new System.Drawing.Point(567, 809);
            this.txtMatchCount.Name = "txtMatchCount";
            this.txtMatchCount.ReadOnly = true;
            this.txtMatchCount.Size = new System.Drawing.Size(142, 28);
            this.txtMatchCount.TabIndex = 8;
            // 
            // txtPassTime
            // 
            this.txtPassTime.Location = new System.Drawing.Point(710, 809);
            this.txtPassTime.Name = "txtPassTime";
            this.txtPassTime.ReadOnly = true;
            this.txtPassTime.Size = new System.Drawing.Size(142, 28);
            this.txtPassTime.TabIndex = 8;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(530, 509);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(116, 18);
            this.label4.TabIndex = 6;
            this.label4.Text = "Group result";
            // 
            // lblRExpression
            // 
            this.lblRExpression.AutoSize = true;
            this.lblRExpression.Location = new System.Drawing.Point(524, 13);
            this.lblRExpression.Name = "lblRExpression";
            this.lblRExpression.Size = new System.Drawing.Size(71, 18);
            this.lblRExpression.TabIndex = 0;
            this.lblRExpression.Text = "Replace";
            // 
            // txtRExpression
            // 
            this.txtRExpression.Location = new System.Drawing.Point(530, 45);
            this.txtRExpression.Name = "txtRExpression";
            this.txtRExpression.Size = new System.Drawing.Size(514, 28);
            this.txtRExpression.TabIndex = 9;
            // 
            // txtTestResult
            // 
            this.txtTestResult.Location = new System.Drawing.Point(526, 171);
            this.txtTestResult.Name = "txtTestResult";
            this.txtTestResult.Size = new System.Drawing.Size(514, 314);
            this.txtTestResult.TabIndex = 10;
            this.txtTestResult.Text = "";
            // 
            // lblTestResult
            // 
            this.lblTestResult.AutoSize = true;
            this.lblTestResult.Location = new System.Drawing.Point(523, 133);
            this.lblTestResult.Name = "lblTestResult";
            this.lblTestResult.Size = new System.Drawing.Size(107, 18);
            this.lblTestResult.TabIndex = 5;
            this.lblTestResult.Text = "Test Result";
            // 
            // frmRegexTest
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 18F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1059, 885);
            this.Controls.Add(this.txtTestResult);
            this.Controls.Add(this.txtRExpression);
            this.Controls.Add(this.txtPassTime);
            this.Controls.Add(this.txtMatchCount);
            this.Controls.Add(this.txtTestStatus);
            this.Controls.Add(this.txtGroupResult);
            this.Controls.Add(this.txtMatchResult);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.lblTestResult);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.txtContent);
            this.Controls.Add(this.btnExecute);
            this.Controls.Add(this.cngReplace);
            this.Controls.Add(this.chkSingleLine);
            this.Controls.Add(this.chkMultiLine);
            this.Controls.Add(this.chkIgnore);
            this.Controls.Add(this.txtPattern);
            this.Controls.Add(this.lblRExpression);
            this.Controls.Add(this.label1);
            this.KeyPreview = true;
            this.Name = "frmRegexTest";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Regular Expression";
            this.Load += new System.EventHandler(this.frmRegexTest_Load);
            this.KeyDown += new System.Windows.Forms.KeyEventHandler(this.frmRegexTest_KeyDown);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtPattern;
        private System.Windows.Forms.CheckBox chkIgnore;
        private System.Windows.Forms.CheckBox chkMultiLine;
        private System.Windows.Forms.CheckBox chkSingleLine;
        private System.Windows.Forms.CheckBox cngReplace;
        private System.Windows.Forms.Button btnExecute;
        private System.Windows.Forms.RichTextBox txtContent;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.RichTextBox txtMatchResult;
        private System.Windows.Forms.RichTextBox txtGroupResult;
        private System.Windows.Forms.TextBox txtTestStatus;
        private System.Windows.Forms.TextBox txtMatchCount;
        private System.Windows.Forms.TextBox txtPassTime;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label lblRExpression;
        private System.Windows.Forms.TextBox txtRExpression;
        private System.Windows.Forms.RichTextBox txtTestResult;
        private System.Windows.Forms.Label lblTestResult;
    }
}

