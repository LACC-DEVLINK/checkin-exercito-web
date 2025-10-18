/**
 * Utilitário para compressão de imagens antes de enviar ao backend
 */

interface CompressImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

/**
 * Comprime uma imagem mantendo a proporção
 * @param base64Image - Imagem em formato base64
 * @param options - Opções de compressão
 * @returns Promise com a imagem comprimida em base64
 */
export const compressImage = (
  base64Image: string,
  options: CompressImageOptions = {}
): Promise<string> => {
  const { maxWidth = 800, maxHeight = 800, quality = 0.7 } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calcular novas dimensões mantendo proporção
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Não foi possível criar contexto do canvas'));
        return;
      }

      // Desenhar imagem redimensionada
      ctx.drawImage(img, 0, 0, width, height);

      // Converter para base64 com compressão
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };

    img.onerror = () => {
      reject(new Error('Erro ao carregar imagem'));
    };

    img.src = base64Image;
  });
};

/**
 * Converte um File em base64
 * @param file - Arquivo de imagem
 * @returns Promise com a imagem em base64
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      resolve(reader.result as string);
    };
    
    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Comprime um arquivo de imagem
 * @param file - Arquivo de imagem
 * @param options - Opções de compressão
 * @returns Promise com a imagem comprimida em base64
 */
export const compressImageFile = async (
  file: File,
  options?: CompressImageOptions
): Promise<string> => {
  const base64 = await fileToBase64(file);
  return compressImage(base64, options);
};

/**
 * Valida se um arquivo é uma imagem válida
 * @param file - Arquivo para validar
 * @returns true se for uma imagem válida
 */
export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
};

/**
 * Obtém o tamanho de uma string base64 em KB
 * @param base64String - String base64
 * @returns Tamanho em KB
 */
export const getBase64Size = (base64String: string): number => {
  const stringLength = base64String.length - 'data:image/png;base64,'.length;
  const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
  return sizeInBytes / 1024; // Retorna em KB
};
