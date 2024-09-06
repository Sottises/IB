using Aspose.Words;
using System.Drawing;
using System.Text;

int selection = 0;

while (true)
{
    Console.WriteLine("1. Encryption:");
    Console.WriteLine("2. Decryption:");

    selection = int.Parse(Console.ReadLine());

    if (selection > 0 && selection < 3)
    {
        Console.Clear();
        if (selection == 1)
        {
            Console.WriteLine("1. Encryption size");
            Console.WriteLine("2. Encryption color");
            int select = int.Parse(Console.ReadLine());
            if (select == 1)
            {
                SizeEncryption();
            }
            else
            {
                ColorEncryption();
            }
        }
        else
        {
            Console.WriteLine("1. Decryption size");
            Console.WriteLine("2. Decryption color");
            int select = int.Parse(Console.ReadLine());
            if (select == 1)
            {
                SizeDecryption();
            }
            else
            {
                ColorDecryption();
            }
        }
    }
}

static void SizeDecryption()
{
    //Initialization 
    var document = new Aspose.Words.Document("size_encrypted.doc");
    DocumentBuilder builder = new DocumentBuilder(document);

    int lines_count = document.Sections[0].Body.Paragraphs.Count;
    String arr = "";
    int size = 0;

    for (int i = 0; i < lines_count; i++)
    {
        if (document.Sections[0].Body.Paragraphs[i].Runs[0].Text.Contains("  "))
        {
            size = i;
            break;
        }

        if (document.Sections[0].Body.Paragraphs[i].Runs[0].Text.EndsWith(" "))
        {
            arr += '1';
        }
        else
        {
            arr += '0';
        }

    }

    Console.WriteLine("Message: " + BinaryToString(arr));
    //Console.WriteLine("Message: " + String.Join(".", arr));
}

static void ColorDecryption()
{
    //Initialization 
    var document = new Aspose.Words.Document("color_encrypted.doc");
    DocumentBuilder builder = new DocumentBuilder(document);

    int lines_count = document.Sections[0].Body.Paragraphs.Count;
    String arr = "";
    int size = 0;

    for (int i = 0; i < lines_count; i++)
    {
        if (document.Sections[0].Body.Paragraphs[i].Runs[0].Font.Color.G == 1 && document.Sections[0].Body.Paragraphs[i].Runs[0].Font.Color.B == 1)
        {
            size = i;
            break;
        }

        if (document.Sections[0].Body.Paragraphs[i].Runs[0].Font.Color.G == 1)
        {
            arr += '1';
        }
        else
        {
            arr += '0';
        }
    }



    Console.WriteLine("Message: " + BinaryToString(arr));
}

static void SizeEncryption()
{
    //Initialization 
    var document = new Aspose.Words.Document("PPP.doc");
    DocumentBuilder builder = new DocumentBuilder(document);

    double lines_count = document.Sections[0].Body.Paragraphs.Count;
    Console.WriteLine("Enter your message to encrypt:");
    String data = Console.ReadLine();
    String bin = StringToBinary(data);

    if (bin.Length > Math.Round(lines_count))
    {
        Console.WriteLine("Message length is more than possible");
        return;
    }


    for (int i = 0; i < bin.Length; i++)
    {
        String additional = bin[i] == '0' ? "" : " ";
        document.Sections[0].Body.Paragraphs[i].Runs[0].Text += additional;

        if (i + 1 == bin.Length)
        {
            document.Sections[0].Body.Paragraphs[i + 1].Runs[0].Text += "  ";
        }
    }

    document.Save("size_encrypted.doc");
}

static void ColorEncryption()
{
    //Initialization 
    var document = new Aspose.Words.Document("PPP.doc");
    DocumentBuilder builder = new DocumentBuilder(document);

    double lines_count = document.Sections[0].Body.Paragraphs.Count;
    Console.WriteLine("You can encrypt only " + Math.Round(lines_count / 8) + " Bytes of data");
    Console.WriteLine("Enter your message:");
    String data = Console.ReadLine();
    String bin = StringToBinary(data);

    if (bin.Length > Math.Round(lines_count))
    {
        Console.WriteLine("Message length is more than possible");
        return;
    }


    for (int i = 0; i < bin.Length; i++)
    {
        int additional = bin[i] == '0' ? 0 : 1;

        Color newC = Color.FromArgb(0, additional, 0);
        document.Sections[0].Body.Paragraphs[i].Runs[0].Font.Color = newC;

        if (i + 1 == bin.Length)
        {
            System.Drawing.Color color = document.Sections[0].Body.Paragraphs[i + 1].Runs[0].Font.Color;
            System.Drawing.Color new_color = Color.FromArgb(0, 1, 1);

            document.Sections[0].Body.Paragraphs[i + 1].Runs[0].Font.Color = new_color;
        }
    }

    document.Save("color_encrypted.doc");
}

//String to Binary method
static string StringToBinary(string data)
{
    String sb = "";

    foreach (char c in data.ToCharArray())
    {
        sb += Convert.ToString(c, 2).PadLeft(8, '0');
    }

    while (sb.Length % 8 != 0)
    {
        sb = "0" + sb;
    }

    return sb;
}

//Binary to String
static string BinaryToString(string data)
{
    List<Byte> byteList = new List<Byte>();

    for (int i = 0; i + 8 - 1 <= data.Length; i += 8)
    {
        byteList.Add(Convert.ToByte(data.Substring(i, 8), 2));
    }
    return Encoding.ASCII.GetString(byteList.ToArray());
}
