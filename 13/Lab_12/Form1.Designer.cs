namespace Lab_12
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.stegOpenFile = new System.Windows.Forms.Button();
            this.stegText = new System.Windows.Forms.TextBox();
            this.stegButton = new System.Windows.Forms.Button();
            this.deStegOpenFile = new System.Windows.Forms.Button();
            this.deStegText = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // stegOpenFile
            // 
            this.stegOpenFile.Location = new System.Drawing.Point(21, 20);
            this.stegOpenFile.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.stegOpenFile.Name = "stegOpenFile";
            this.stegOpenFile.Size = new System.Drawing.Size(632, 54);
            this.stegOpenFile.TabIndex = 4;
            this.stegOpenFile.Text = "Choose file";
            this.stegOpenFile.UseVisualStyleBackColor = true;
            this.stegOpenFile.Click += new System.EventHandler(this.openFile_Click);
            // 
            // stegText
            // 
            this.stegText.Location = new System.Drawing.Point(21, 143);
            this.stegText.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.stegText.Name = "stegText";
            this.stegText.Size = new System.Drawing.Size(632, 22);
            this.stegText.TabIndex = 6;
            // 
            // stegButton
            // 
            this.stegButton.Location = new System.Drawing.Point(21, 205);
            this.stegButton.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.stegButton.Name = "stegButton";
            this.stegButton.Size = new System.Drawing.Size(632, 54);
            this.stegButton.TabIndex = 7;
            this.stegButton.Text = "Encoding";
            this.stegButton.UseVisualStyleBackColor = true;
            this.stegButton.Click += new System.EventHandler(this.stegButton_Click);
            // 
            // deStegOpenFile
            // 
            this.deStegOpenFile.Location = new System.Drawing.Point(21, 309);
            this.deStegOpenFile.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.deStegOpenFile.Name = "deStegOpenFile";
            this.deStegOpenFile.Size = new System.Drawing.Size(632, 54);
            this.deStegOpenFile.TabIndex = 10;
            this.deStegOpenFile.Text = "Decoding";
            this.deStegOpenFile.UseVisualStyleBackColor = true;
            this.deStegOpenFile.Click += new System.EventHandler(this.deStegOpenFile_Click);
            // 
            // deStegText
            // 
            this.deStegText.Location = new System.Drawing.Point(21, 432);
            this.deStegText.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.deStegText.Name = "deStegText";
            this.deStegText.Size = new System.Drawing.Size(632, 22);
            this.deStegText.TabIndex = 11;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(274, 125);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(137, 16);
            this.label1.TabIndex = 12;
            this.label1.Text = "Message to encoding";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(274, 414);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(126, 16);
            this.label2.TabIndex = 12;
            this.label2.Text = "Decoding message";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(679, 703);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.deStegText);
            this.Controls.Add(this.deStegOpenFile);
            this.Controls.Add(this.stegButton);
            this.Controls.Add(this.stegText);
            this.Controls.Add(this.stegOpenFile);
            this.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.Name = "Form1";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "lab14";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.Button stegOpenFile;
        private System.Windows.Forms.TextBox stegText;
        private System.Windows.Forms.Button stegButton;
        private System.Windows.Forms.Button deStegOpenFile;
        private System.Windows.Forms.TextBox deStegText;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
    }
}

